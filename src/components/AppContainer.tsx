import { ReactNode } from 'react';

interface AppContainerProps {
    children: ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
    return (
        <div className='rounded bg-violet min-h-screen flex justify-center align-middle flex-col'>
            <div className='flex flex-col m-auto w-full relative pt-4' style={{ maxWidth: 464 }}>
                {children}
            </div>
        </div>
    );
};

export default AppContainer;