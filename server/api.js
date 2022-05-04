class API {
  constructor (query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  // //////////////////////////////////////////////////////////////////
  // Advanced filtering
  // //////////////////////////////////////////////////////////////////
  filter () {
    const queryObject = { ...this.queryString } // hardcopy instead of reference
    const excludedFields = ['fields', 'page', 'sort', 'limit'] // exclude advanced query properties to not pollute .find() method
    excludedFields.forEach(el => delete queryObject[el])

    let queryString = JSON.stringify(queryObject) // is there a better way to do this?
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) // add $ to query properties for mongoose

    this.query = this.query.find(JSON.parse(queryString))

    return this
  }

  // //////////////////////////////////////////////////////////////////
  // Sorting
  // //////////////////////////////////////////////////////////////////
  sort () {
    if (this.queryString.sort) {
      const sortByMultiple = this.queryString.sort.split(',').join(' ') // can not have a space in URL
      this.query = this.query.sort(sortByMultiple)
    } else {
      this.query = this.query.sort('-createdAt') // default sorting newest first
    }

    return this
  }

  // //////////////////////////////////////////////////////////////////
  // Field limiting
  // //////////////////////////////////////////////////////////////////
  limitFields () {
    if (this.queryString.fields) {
      const limitedFields = this.queryString.fields.split(',').join(' ') // can not have a space in URL
      this.query = this.query.select(limitedFields)
    } else {
      this.query = this.query.select('-__v') // default remove mongo NUB exposure
    }
    return this
  }

  // //////////////////////////////////////////////////////////////////
  // Pagination
  // //////////////////////////////////////////////////////////////////
  paginate () {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 1000
    const skipOutput = (page - 1) * limit

    this.query = this.query.skip(skipOutput).limit(limit)

    return this
  }
}

module.exports = API
