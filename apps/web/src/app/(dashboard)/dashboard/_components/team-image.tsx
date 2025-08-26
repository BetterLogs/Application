import { Upload, XIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useFileUpload } from '@/hooks/use-file-upload';
export default function OrganizationImage() {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: 'image/*',
    });

  const previewUrl = files[0]?.preview || null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <Button
          aria-label={previewUrl ? 'Change image' : 'Upload image'}
          className="relative mb-2 size-12 overflow-hidden rounded-full p-0 shadow-none"
          onClick={openFileDialog}
          variant="outline"
        >
          {previewUrl ? (
            <Image
              alt="Preview of uploaded image"
              className="size-full object-cover"
              height={64}
              src={previewUrl}
              style={{ objectFit: 'cover' }}
              width={64}
            />
          ) : (
            <div aria-hidden="true">
              <Upload className="size-4 opacity-60" />
            </div>
          )}
        </Button>
        {previewUrl && (
          <Button
            aria-label="Remove image"
            className="-top-2 -right-2 absolute size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          {...getInputProps()}
          aria-label="Upload image file"
          className="sr-only"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
