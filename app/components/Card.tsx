import "./Card.css";
import Image from "next/image";

interface Props {
    imgSrc: string;
    imgAlt: string;
    title: string;
    description: string;
    buttonText: string;
    link: string;
}

export const Card = ({
                         imgSrc,
                         imgAlt,
                         title,
                         description,
                         buttonText,
                         link,
                     }: Props) => {
    return (
        <div className="card-container">
            {imgSrc && imgAlt && (
                <Image width={240} height={360} src={imgSrc} alt={imgAlt} className="card-img"/>
            )}
            {title && <h5 className="card-title">{title}</h5>}
            {description && <p className="card-description">{description}</p>}
            {buttonText && link && (
                <a href={link} className="card-btn">
                    {buttonText}
                </a>
            )}
        </div>
    );
};
