import { useEffect } from 'react';


export default function NotFound() {
    useEffect(() => {
        document.title = 'Not Found - Co-Lab';
    }, []);
    return (
        <div className = 'bg-gray-background'>
            <div ClassName = 'mx-auth max-w-screen-lg'>
                <p className = 'text-center text-2xl'>Not Found!</p>
            </div>
        </div>
    )
};