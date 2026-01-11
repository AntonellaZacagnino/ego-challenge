import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getModels, type Model } from "../../services/models";
import './ListModels.scss';
import Loader from '../Loader/Loader';

export default function ListModels() {
  const navigate = useNavigate();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    getModels()
      .then(data => setModels(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  function getFilteredModels(): Model[] {
    if (!selectedFilter || selectedFilter === 'Todos') return models;
    if (selectedFilter === 'Autos') return models.filter(model => model.segment !== 'Pickups y Comerciales' && model.segment !== 'SUVs');
    if (selectedFilter === 'Pickups y comerciales') return models.filter(model => model.segment === 'Pickups y Comerciales');
    if (selectedFilter === 'SUVs y crossovers') return models.filter(model => model.segment === 'SUVs');
    return models;
  }

  function getSortedModels(modelsToSort: Model[]): Model[] {
    const sorted = [...modelsToSort];
    if (sortBy === 'menor-precio') sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === 'mayor-precio') sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === 'mas-nuevos') sorted.sort((a, b) => b.year - a.year);
    else if (sortBy === 'mas-viejos') sorted.sort((a, b) => a.year - b.year);
    return sorted;
  }

  

  return (
    <div>
      <div className='filters'>
        <div className='filters-container'>
          <select className='filters-dropdown' value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="" disabled hidden>Filtrar por</option>
            <option value="Todos">Todos</option>
            <option value="Autos">Autos</option>
            <option value="Pickups y comerciales">Pickups y comerciales</option>
            <option value="SUVs y crossovers">SUVs y crossovers</option>
          </select>
        </div>
        <span>Filtrar por</span>
        <ul className='filters-list'>
          <li className={selectedFilter === 'Todos' ? 'active' : ''} onClick={() => setSelectedFilter('Todos')}>Todos</li>
          <li className={selectedFilter === 'Autos' ? 'active' : ''} onClick={() => setSelectedFilter('Autos')}>Autos</li>
          <li className={selectedFilter === 'Pickups y comerciales' ? 'active' : ''} onClick={() => setSelectedFilter('Pickups y comerciales')}>Pickups y comerciales</li>
          <li className={selectedFilter === 'SUVs y crossovers' ? 'active' : ''} onClick={() => setSelectedFilter('SUVs y crossovers')}>SUVs y crossovers</li>
        </ul>
        <div className='sort-container'>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="" disabled hidden>Ordenar por</option>
            <option value="menor-precio">De menor a mayor precio</option>
            <option value="mayor-precio">De mayor a menor precio</option>
            <option value="mas-nuevos">Más nuevos primero</option>
            <option value="mas-viejos">Más viejos primero</option>
          </select>
        </div>
      </div>
      <div>
        <ul className="model-list">
          {getSortedModels(getFilteredModels()).map(model => (
            <div className="model-card" key={model.id}>
                <li>
                    <h2>{model.name}</h2>
                    <span>{model.year} | $ {model.price}</span>
                    <img 
                      src={model.thumbnail} 
                      alt={model.name}
                      onClick={() => navigate(`/modelo/${model.id}`)}
                      style={{ cursor: 'pointer' }}
                    />
                </li>
                <Link to={`/modelo/${model.id}`}>
                    <button>Ver modelo</button>
                </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}