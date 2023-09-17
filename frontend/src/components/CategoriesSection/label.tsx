import "./categories.css"
import { CategoryProps } from "../../types/categoryProps";
import { getImagePath } from "../../utils/getImagePath";


interface LabelProps extends CategoryProps {
    selected : boolean
}

export default function Label({ label, image, selected }: LabelProps) {
    return(
        <div className={`label-container ${selected && "label-selected"}`} >
        <img
          src={image? getImagePath(image) : "https://via.placeholder.com/150"}
          alt={label}
          className="label-image"
        />
        <div className="label-text">
            {label}
        </div>
      </div>
    )

}