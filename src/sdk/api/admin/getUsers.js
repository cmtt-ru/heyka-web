import axios from 'axios';

/**
 * Get users of specific workspace new version
 * @param {string} workspaceId – workspace id
 * @returns {array}
 */
export default function (workspaceId) {
  return axios.get(`/admin/workspaces/${workspaceId}/users`).then(res => res.data);
}
