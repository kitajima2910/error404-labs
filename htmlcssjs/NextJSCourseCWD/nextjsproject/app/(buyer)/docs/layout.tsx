export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
            <div>Make By XYZ.COM</div>
        </>
    );
}
