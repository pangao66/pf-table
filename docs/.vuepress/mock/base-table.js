import Mock from 'mockjs'
import {addUser, deleteUser, getPageList, getSearchList, updateUser} from './methods'

Mock.mock('/base-table', {
  'list|3': [{
    'id|+1': 1,
    'email': '@email',
    'name': '@cname',
    'address': '@county(true)'
  }]
})
Mock.mock('/page-table', 'post', getPageList)
Mock.mock('/search-table', 'post', getSearchList)
Mock.mock('/delete-user', 'post', deleteUser)
Mock.mock('/update-user', 'post', updateUser)
Mock.mock('/add-user', 'post', addUser)
export default Mock