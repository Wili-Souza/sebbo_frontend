import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor( private httpClient: HttpClient) { }

  getFileFromUrl(imageUrl: string): Observable<File> {
    return this.httpClient
      .get(imageUrl, { responseType: 'blob' })
      .pipe( 
        map(blob => this.blobToFile(blob, imageUrl) as File),
        // map(file => this.fileToFormData(file) as FormData),
      )
  }

  private blobToFile(blob: Blob, imageUrl: string): File {
    const fileName = imageUrl.split("/").pop() || "imagem_capa";
    return new File([blob], fileName);
  }

  // private fileToFormData(file: File): FormData {
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   return formData;
  // }
}
