import axios from "axios";
import { useEffect, useState } from "react";
import { RepositoryItem } from "../RepositoryItem";
import "./index.scss";

type RepositoryList = {
  id: string;
  name: string;
  description: string;
  html_url: string;
};

export const RepositoryList = () => {
  const [repos, setRepos] = useState<RepositoryList[]>([]);

  const handleRepos = async () => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/Williams25/repos?page=1`
      );
      setRepos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRepos();
  }, [repos]);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {repos?.map((repo) => (
          <li key={repo.id}>
            <RepositoryItem
              repository={{
                name: repo.name,
                description: repo.description,
                link: repo.html_url,
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
