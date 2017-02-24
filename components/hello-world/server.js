module.exports.data = (context, callback) => {
  callback(null, {
    name: context.params.name || 'John Doe'
  }) // eslint-disable-line semi
} // eslint-disable-line semi
