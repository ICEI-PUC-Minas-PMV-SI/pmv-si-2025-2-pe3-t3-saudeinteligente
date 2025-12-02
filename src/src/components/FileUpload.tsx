import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Loader2, X, FileText, FileImage, File as FileIcon } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { projectId } from '../utils/supabase/info';

interface FileUploadProps {
  patientId: string;
  accessToken: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess: () => void;
}

const EXAM_TYPES = [
  'Hemograma',
  'Raio-X',
  'Tomografia',
  'Ressonância Magnética',
  'Ultrassom',
  'Eletrocardiograma',
  'Urinálise',
  'Glicemia',
  'Colesterol',
  'Outro',
];

export function FileUpload({ patientId, accessToken, open, onOpenChange, onUploadSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [examType, setExamType] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !examType) {
      setError('Por favor, selecione um arquivo e o tipo de exame');
      return;
    }

    try {
      setUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('patientId', patientId);
      formData.append('examType', examType);
      formData.append('description', description);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer upload');
      }

      // Reset form
      setFile(null);
      setExamType('');
      setDescription('');
      onUploadSuccess();
      onOpenChange(false);
    } catch (err: any) {
      console.error('Error uploading file:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return <FileIcon className="h-12 w-12 text-gray-400" />;
    
    const type = file.type;
    if (type.startsWith('image/')) {
      return <FileImage className="h-12 w-12 text-blue-500" />;
    } else if (type === 'application/pdf') {
      return <FileText className="h-12 w-12 text-red-500" />;
    } else {
      return <FileIcon className="h-12 w-12 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload de Exame/Documento</DialogTitle>
          <DialogDescription>
            Faça upload de resultados de exames ou documentos médicos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="examType">Tipo de Exame *</Label>
            <Select value={examType} onValueChange={setExamType} disabled={uploading}>
              <SelectTrigger id="examType">
                <SelectValue placeholder="Selecione o tipo de exame" />
              </SelectTrigger>
              <SelectContent>
                {EXAM_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição/Observações</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Informações adicionais sobre o exame..."
              rows={3}
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <Label>Arquivo *</Label>
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !uploading && document.getElementById('file-input')?.click()}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Arraste e solte o arquivo aqui ou clique para selecionar
                </p>
                <p className="text-xs text-gray-500">
                  PDF, imagens, documentos (máx. 50MB)
                </p>
                <Input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  {getFileIcon()}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    disabled={uploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || !examType || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer Upload
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
