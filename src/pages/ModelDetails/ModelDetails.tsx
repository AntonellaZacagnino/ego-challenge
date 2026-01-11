import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailsModel, type DetailsModel } from '../../services/detailsModels';
import './ModelDetails.scss';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Loader from '../../components/Loader/Loader';

export default function ModelDetails() {
    const { id } = useParams<{ id: string }>();
    const modelId = id ? parseInt(id, 10) : 0;
    const [model, setModel] = useState<DetailsModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ref] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "free-snap",
    breakpoints: {
      "(min-width: 300px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 5, spacing: 20 },
      },
    },
  })
    useEffect(() => {
        getDetailsModel(modelId)
            .then(data => setModel(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [modelId]);

    if (loading) return <Loader />;
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
                <div className="features">
                    <div ref={ref} className="keen-slider">
                        {model.model_features.map((feature) => (
                            <div className="keen-slider__slide number-slide1">
                                <img src={feature.image} alt={feature.name} />
                                <h3>{feature.name}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {model.model_highlights && model.model_highlights.length > 0 && (
                <div className="highlights">
                    <ul>
                        {model.model_highlights.map((highlight, index) => (
                            <li key={index}>
                                <div className="highlight-text" >
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
