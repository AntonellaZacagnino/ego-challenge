import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailsModel, type DetailsModel } from '../../services/detailsModels';
import './ModelDetails.scss';
import Loader from '../../components/Loader/Loader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ModelDetails() {
    const { id } = useParams<{ id: string }>();
    const modelId = id ? parseInt(id, 10) : 0;
    const [model, setModel] = useState<DetailsModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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
                    <div className="slider-container">
                        <Slider {...settings}>    
                        {model.model_features.map((feature) => (
                                <div>
                                    <img src={feature.image} alt={feature.name} />
                                    <h3>{feature.name}</h3>
                                    <p>{feature.description}</p>
                                </div>
                        ))}
                        </Slider>
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
