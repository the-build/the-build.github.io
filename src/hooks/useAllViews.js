import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../utils/firebase';

// Reads the entire `views` node from Realtime DB and returns it as a
// { [slug]: count } map. `null` while loading, `{}` when empty.
export function useAllViews() {
    const [views, setViews] = useState(null);

    useEffect(() => {
        const viewsRef = ref(db, 'views');
        const unsubscribe = onValue(viewsRef, (snapshot) => {
            setViews(snapshot.val() ?? {});
        });
        return () => unsubscribe();
    }, []);

    return views;
}
