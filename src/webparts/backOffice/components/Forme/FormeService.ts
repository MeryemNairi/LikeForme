import { sp } from '@pnp/sp';
import { IFormData } from './IFormProps';

export const submitForm = async (formData: IFormData) => {
  try {
    const list = sp.web.lists.getByTitle('Like2');
    await list.items.add({
      user: formData.user,
      likes: formData.likes,
      newsId: formData.newsId // Ajout de newsId lors de l'ajout du like
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    throw new Error('An error occurred while submitting the form. Please try again.');
  }
};

export const getFormData = async (): Promise<IFormData[]> => {
  try {
    const list = sp.web.lists.getByTitle('Like2');
    const items = await list.items.select('Id', 'user', 'likes', 'newsId').get(); // Ajout de newsId à la sélection
    return items.map((item: any) => ({
      id: item.Id,
      user: item.user,
      likes: parseInt(item.likes),
      newsId: item.newsId // Récupération de newsId
    }));
  } catch (error) {
    console.error('Error fetching form data:', error);
    throw new Error('An error occurred while fetching form data. Please try again.');
  }
};

export const deleteFormData = async (id: number) => {
  try {
    const list = sp.web.lists.getByTitle('Like2');
    await list.items.getById(id).delete();
  } catch (error) {
    console.error('Error deleting form data:', error);
    throw new Error('An error occurred while deleting form data. Please try again.');
  }
};
