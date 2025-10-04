const Archives = ({ projects }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
      {projects.map((project) => (
        <ProjectCards key={project.id} project={project} />
      ))}
    </>
  );
};

export default Archives;
