// User interfaces
/**
 * @typedef {Object} LinkedAccount
 * @property {string} platform
 * @property {string} icon
 * @property {string} url
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [profilePicture]
 * @property {boolean} isVerified
 * @property {LinkedAccount[]} [linkedAccounts]
 */
 

 * @typedef {Object} BasePost
 * @property {string} id
 * @property {string} userId
 * @property {string} userName
 * @property {string} [userPicture]
 * @property {string} timePosted
 * @property {string} description
 * @property {string} category
 * @property {string} location
 * @property {string} schedule
 * @property {string} [additionalNotes]
 * @property {string} [proof]
 */

/**
 * @typedef {BasePost & {
*   request: string;
*   skillsOffered: string[];
* }} SkillRequest
*/

/**
* @typedef {BasePost & {
*   skills: string[];
*   skillsRequested: string[];
* }} SkillOffer
*/

// Report
/**
* @typedef {Object} Report
* @property {string} [id]
* @property {string} reportedUserName
* @property {string} reason
* @property {string} description
* @property {File|null} [proofFile]
* @property {Date} [createdAt]
*/

// Forms
/**
* @typedef {Object} SkillRequestForm
* @property {string} request
* @property {string} description
* @property {string} category
* @property {string} location
* @property {string} skillsOffered
* @property {string} schedule
* @property {string} additionalNotes
* @property {File|null} proof
*/

/**
* @typedef {Object} LoginForm
* @property {string} email
* @property {string} password
*/

/**
* @typedef {Object} RegisterForm
* @property {string} firstName
* @property {string} lastName
* @property {string} email
* @property {string} password
* @property {string} confirmPassword
*/
