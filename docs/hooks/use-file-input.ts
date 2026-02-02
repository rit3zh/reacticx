import { useState, useRef } from "react";

interface UseFileInputOptions {
    accept?: string;
    maxSize?: number;
}

export function useFileInput({ accept, maxSize }: UseFileInputOptions) {
    const [fileName, setFileName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileSize, setFileSize] = useState<number>(0);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        validateAndSetFile(file);
    };

    const validateAndSetFile = (file: File | undefined) => {
        setError("");

        if (file) {
            if (maxSize && file.size > maxSize * 1024 * 1024) {
                setError(`File size must be less than ${maxSize}MB`);
                return;
            }

            if (
                accept &&
                !file.type.match(accept.replace("/*", "/"))
            ) {
                setError(`File type must be ${accept}`);
                return;
            }

            setFileSize(file.size);
            setFileName(file.name);
        }
    };

    const clearFile = () => {
        setFileName("");
        setError("");
        setFileSize(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return {
        fileName,
        error,
        fileInputRef,
        handleFileSelect,
        validateAndSetFile,
        clearFile,
        fileSize,
    };
}
