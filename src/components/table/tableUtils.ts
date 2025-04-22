export function sortData<T>(
    data: T[],
    sortBy: keyof T | null,
    direction: 'asc' | 'desc'
  ): T[] {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      return direction === 'asc'
        ? String(valA ?? '').localeCompare(String(valB ?? ''))
        : String(valB ?? '').localeCompare(String(valA ?? ''));
    });
  }
  