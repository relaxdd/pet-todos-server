import checkContentType from './checkContentType'

const checkBodyIsJson = checkContentType('application/json', true)

export default checkBodyIsJson
