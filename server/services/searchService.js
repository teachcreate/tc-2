const supabase = require('../supabaseClient');

const searchProducts = async (query) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price')
      .textSearch('title', query, {
        type: 'websearch',
        config: 'english',
      })

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

module.exports = { searchProducts };