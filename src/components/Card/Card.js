import "./Card.css";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/css'; // Import Swiper styles
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export const Card = ({ categoria, livros }) => {
  return (
    <div className="card">
      <h3>{categoria}</h3>
      <Swiper navigation={true} modules={[Navigation]}>
      {livros &&
        livros.map((value, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="card-image">
                <img
                  className="livro-imagem"
                  src={value.imagem}
                  alt={`imagem da capa do livro ${value.titulo}`}
                ></img>
              </div>
              <div className="card-body">
                <h4>{value.titulo}</h4>
                <p>{value.descricao}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
