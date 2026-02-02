import { useState } from "react";

interface Tag {
    id: string;
    label: string;
    color?: string;
}

interface UseTagsProps {
    onChange?: (tags: Tag[]) => void;
    defaultTags?: Tag[];
    maxTags?: number;
    defaultColors?: string[];
}

export function useTags({
    onChange,
    defaultTags = [],
    maxTags = 10,
    defaultColors = [
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    ],
}: UseTagsProps = {}) {
    const [tags, setTags] = useState<Tag[]>(defaultTags);

    function addTag(tag: Tag) {
        if (tags.length >= maxTags) return;

        const newTags = [
            ...tags,
            {
                ...tag,
                color:
                    tag.color ||
                    defaultColors[tags.length % defaultColors.length],
            },
        ];
        setTags(newTags);
        onChange?.(newTags);
        return newTags;
    }

    function removeTag(tagId: string) {
        const newTags = tags.filter((t) => t.id !== tagId);
        setTags(newTags);
        onChange?.(newTags);
        return newTags;
    }

    function removeLastTag() {
        if (tags.length === 0) return;
        return removeTag(tags[tags.length - 1].id);
    }

    return {
        tags,
        setTags,
        addTag,
        removeTag,
        removeLastTag,
        hasReachedMax: tags.length >= maxTags,
    };
}
