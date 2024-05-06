import * as React from 'react';
import { IFormProps, IFormData } from './IFormProps';
import { submitForm, getFormData, deleteFormData } from './FormeService';
import styles from './Forme.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export const Forme: React.FC<IFormProps> = ({ context }) => {
  const [formData, setFormData] = React.useState<IFormData>({
    id: 0,
    user: context.pageContext.user.displayName,
    likes: 1, 
  });

  const [formEntries, setFormEntries] = React.useState<IFormData[]>([]);

  React.useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const formData = await getFormData();
      setFormEntries(formData);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const existingEntryIndex = formEntries.findIndex(entry => entry.user === formData.user);

      if (existingEntryIndex !== -1) {
        const existingEntry = formEntries[existingEntryIndex];
        await deleteFormData(existingEntry.id);
        const updatedEntries = [...formEntries];
        updatedEntries.splice(existingEntryIndex, 1);
        setFormEntries(updatedEntries);
      } else {
        await submitForm(formData);
      }
      
      setFormData({
        id: 0,
        user: context.pageContext.user.displayName,
        likes: 1,
      });

      fetchFormData();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };
  const isUserLiked = formEntries.some(entry => entry.user === formData.user);

  const totalLikes = formEntries.reduce((total, entry) => total + entry.likes, 0);

  return (
    <div className={styles.backOfficeContainer} style={{ position: 'relative' }}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input type="hidden" id="user" name="user" value={formData.user} />
        <input type="hidden" id="likes" name="likes" value={formData.likes} />
        <div>
        <button type="submit" className={styles.button} style={{ background: 'transparent', border: 'none', fontSize: '16px', padding: '8px' }}>
            {isUserLiked ? <FavoriteIcon style={{ color: 'red', fontSize: '40px' }} /> : <FavoriteBorderIcon style={{ color: 'white', fontSize: '40px' }} />}
            {totalLikes}
          </button>      </div>
      </form>

      <p>Here, it's just to visualize what's happening on the backend</p>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {formEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.user}</td>
              <td>{entry.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Forme;
