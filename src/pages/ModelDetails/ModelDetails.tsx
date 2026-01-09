import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailsModel, type DetailsModel } from '../../services/detailsModels';
import './ModelDetails.scss';

export default function ModelDetails() {
    const { id } = useParams<{ id: string }>();
    const modelId = id ? parseInt(id, 10) : 0;
    const [model, setModel] = useState<DetailsModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentFeature, setCurrentFeature] = useState(0);

    useEffect(() => {
        getDetailsModel(modelId)
            .then(data => setModel(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [modelId]);

    const nextFeature = () => {
        if (model?.model_features) {
            setCurrentFeature((prev) => (prev + 1) % model.model_features.length);
        }
    };

    const prevFeature = () => {
        if (model?.model_features) {
            setCurrentFeature((prev) => (prev - 1 + model.model_features.length) % model.model_features.length);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!model) return <p>Modelo no encontrado</p>;

    return (
        <div className="model-details">
            <div className='model-header'>
                <div>
                    <img src={model.photo} alt={model.name} />
                </div>
                <div className='model-title'>
                    <h1 className='title'>{model.name}</h1>
                    <p className='description'>{model.description}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius cupiditate soluta, odit perspiciatis est aut dolorem doloremque excepturi tenetur similique. Eius illo nobis et perferendis iusto quia, quisquam porro hic.</p>
                </div>
            </div>

            {model.model_features && model.model_features.length > 0 && (
                <div className="features-carousel">
                    <button className="carousel-btn prev" onClick={prevFeature}>‹</button>
                    <div className="feature-item">
                        <img src={model.model_features[currentFeature].image} alt={model.model_features[currentFeature].name} />
                        <h3>{model.model_features[currentFeature].name}</h3>
                        <p>{model.model_features[currentFeature].description}</p>
                    </div>
                    <button className="carousel-btn next" onClick={nextFeature}>›</button>
                    <div className="carousel-dots">
                        {model.model_features.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentFeature ? 'active' : ''}`}
                                onClick={() => setCurrentFeature(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {model.model_highlights && model.model_highlights.length > 0 && (
                <div className="highlights">
                    <ul>
                        {model.model_highlights.map((highlight, index) => (
                            <li key={index}>
                                <div className="highlight-text">
                                    <h3>{highlight.title}</h3>
                                    <p>{highlight.content}</p>
                                </div>
                                <img src={highlight.image} alt={highlight.title} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
