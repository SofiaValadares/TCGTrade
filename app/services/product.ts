import { fetchAPI } from '@/app/lib/apiClient';
import { 
  ProductRecordDto, 
  ProductResponseDto,
  PageProductResponseDto
} from '@/app/types/product';

export const getAllProducts = async (): Promise<ProductResponseDto[]> => {
  return fetchAPI<ProductResponseDto[]>('/api/products', {
    method: 'GET'
  });
};

export const getOneProduct = async (id: number): Promise<ProductResponseDto> => {
  return fetchAPI<ProductResponseDto>(`/api/products/${id}`, {
    method: 'GET'
  });
};

export const saveProduct = async (data: ProductRecordDto): Promise<ProductResponseDto> => {
  return fetchAPI<ProductResponseDto>('/api/products', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateProduct = async (id: number, data: ProductRecordDto): Promise<ProductResponseDto> => {
  return fetchAPI<ProductResponseDto>(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteProduct = async (id: number): Promise<void> => {
  return fetchAPI<void>(`/api/products/${id}`, {
    method: 'DELETE'
  });
};

export const getAllPageProducts = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'id',
  order: string = 'asc',
  name?: string,
  value?: number,
  tax?: number
): Promise<PageProductResponseDto> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
    order
  });

  if (name) params.append('name', name);
  if (value) params.append('value', value.toString());
  if (tax) params.append('tax', tax.toString());

  return fetchAPI<PageProductResponseDto>(`/api/products/page?${params.toString()}`, {
    method: 'GET'
  });
}; 