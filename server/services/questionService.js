import { supabase } from '../supabaseClient.js';

class QuestionService {
  static async createQuestionType(typeData) {
    const { data, error } = await supabase
      .from('question_types')
      .insert(typeData)
      .select();
    
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async getQuestionTypes() {
    const { data, error } = await supabase
      .from('question_types')
      .select('*');
    
    if (error) throw new Error(error.message);
    return data;
  }

  static async validateQuestion(productId, questionData) {
    // Get product's supported question types
    const { data: product } = await supabase
      .from('products')
      .select('question_types')
      .eq('id', productId)
      .single();

    if (!product) throw new Error('Product not found');
    
    // Verify question type is supported
    const isSupported = product.question_types.includes(questionData.type_id);
    if (!isSupported) throw new Error('Question type not supported by this product');

    return true;
  }

  static async addQuestionToProduct(productId, questionData) {
    await this.validateQuestion(productId, questionData);
    
    // In a real implementation, we'd store the question data
    // This is a simplified version for demonstration
    return { success: true, question: questionData };
  }
}

export default QuestionService;