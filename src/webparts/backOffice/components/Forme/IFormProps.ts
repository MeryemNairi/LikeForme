import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFormData {
  id: number; 
  user: string; 
  likes: number; 
  newsId: number; 

}

export interface IFormProps {
  newsId: number; 
  context: WebPartContext;
}
