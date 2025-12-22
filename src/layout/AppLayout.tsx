import '../styles/layout/AppLayout.css';

interface AppLayoutProps {
	header: React.ReactNode;
	main: React.ReactNode;
	footer: React.ReactNode;
}

const AppLayout = ({ header, main, footer }: AppLayoutProps) => {
	return (
		<div className="layout">
			{header}
			<main className="layout__main">
				{main}
			</main>
			{footer}
		</div>
	);
};

export default AppLayout;