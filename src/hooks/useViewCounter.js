import { useState, useEffect } from 'react';
import { ref, runTransaction, onValue } from 'firebase/database';
import { db } from '../utils/firebase';

export function useViewCounter(slug, increment = true) {
    const [views, setViews] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const viewRef = ref(db, `views/${slug}`);

        if (increment) {
            runTransaction(viewRef, (current) => (current || 0) + 1);
        }

        const unsubscribe = onValue(viewRef, (snapshot) => {
            setViews(snapshot.val() ?? 0);
        });

        return () => unsubscribe();
    }, [slug]);

    return views;
}
