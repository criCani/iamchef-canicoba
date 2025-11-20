import './Layout.css';

interface LayoutProps {
  header: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
}

const Layout = ({ header, main, footer }: LayoutProps) => {
	return (
		<main className="w-screen max-h-screen flex flex-col min-h-screenw-screen max-w-96 h-screen flex flex-col mx-auto bg-green-700 overflow-hidden">
			<header className="layout-header">{header}</header>
			<section className="w-full flex-1 flex justify-center min-h-0 overfloew-hidden">
				{main}
			</section>
			{footer}
		</main>
	);
};

export default Layout;
