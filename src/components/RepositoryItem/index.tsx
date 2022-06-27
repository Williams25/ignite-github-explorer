import "./index.scss";

type RepositoryItemProps = {
  repository: {
    name: string;
    description: string;
    link: string;
  };
};

export const RepositoryItem = ({ repository }: RepositoryItemProps) => {
  return (
    <div className="repositoryItem">
      <strong>{repository?.name}</strong>
      {repository?.description && <p>{repository?.description}</p>}
      <a href={repository?.link}>ver repositório</a>
    </div>
  );
};
