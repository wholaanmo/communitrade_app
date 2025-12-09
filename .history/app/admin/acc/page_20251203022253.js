'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Import Firebase helpers
import { adminDB, statsDB } from '@/lib/firebaseHelpers';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Modal states
  const [showDeactivatedModal, setShowDeactivatedModal] = useState(false);
  const [showRemovedModal, setShowRemovedModal] = useState(false);
  const [showKeptModal, setShowKeptModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Firebase data states
  const [deactivatedAccounts, setDeactivatedAccounts] = useState([]);
  const [removedPosts, setRemovedPosts] = useState([]);
  const [keptPosts, setKeptPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    deactivatedAccounts: 0,
    removedPosts: 0,
    keptPosts: 0
  });
  const [loading, setLoading] = useState(true);

  // Current profile for modal
  const [currentProfile, setCurrentProfile] = useState({});
  const [postToDelete, setPostToDelete] = useState(null);

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
  
    // If not the admin email, redirect to user dashboard
    if (session.user?.email !== "floresjamaicamae30@gmail.com") {
      router.push("/user/dashboard");
      return;
    }
  }, [session, status, router]);

  // Fetch admin data from Firebase
  useEffect(() => {
    if (!session?.user?.isAdmin) return;

    const fetchAdminData = async () => {
      try {
        setLoading(true);

        // Fetch dashboard stats
        const dashboardStats = await statsDB.getDashboardStats();
        setStats({
          totalUsers: dashboardStats.totalUsers || 0,
          deactivatedAccounts: dashboardStats.deactivatedUsers || 0,
          removedPosts: dashboardStats.reportedPosts || 0,
          keptPosts: dashboardStats.keptPosts || 0
        });

        // Fetch all users
        const users = await adminDB.getAllUsers();
        setAllUsers(users);

        // Fetch deactivated accounts
        const deactivated = await adminDB.getDeactivatedUsers();
        setDeactivatedAccounts(deactivated.map(acc => ({
          id: acc.id,
          fullName: acc.userName || 'Unknown User',
          email: acc.userEmail || 'No email',
          phone: acc.phone || 'No phone',
          profilePicture: acc.profilePicture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
          deactivationDuration: `${acc.durationDays || 7} days`,
          reason: acc.reason || 'No reason provided'
        })));

        // Fetch reported posts (removed posts)
        const reported = await adminDB.getReportedPosts();
        setRemovedPosts(reported.map(post => ({
          id: post.id,
          type: post.type || 'offer',
          skills: post.skills || 'Unknown Skill',
          request: post.request || 'Unknown Request',
          description: post.description || 'No description',
          category: post.category || 'General',
          location: post.location || 'Not specified',
          skillsRequested: post.skillsRequested || 'Not specified',
          skillsOffered: post.skillsOffered || 'Not specified',
          schedule: post.schedule || 'Flexible',
          additionalNotes: post.additionalNotes || '',
          reportReason: post.reason || 'No reason provided',
          userId: post.userId,
          userFullName: post.reportedUserName || 'Unknown User',
          userProfilePicture: post.userPicture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MH