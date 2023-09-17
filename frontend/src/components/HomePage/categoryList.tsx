import Label from "./label";
import "../CategoriesSection/categories.css";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { getCategoriesFromApi } from "../../apis/categoryApis";

interface CategoryProps {
  parent?: number;
  id: number;
  label: string;
  image: string;

}

export default function CategoriesList({  selected,
  setSelected} : {selected: number[], setSelected: Function}) {
  const [categories, setCategories] = useState([] as CategoryProps[][]);

  const getCategories = async (id?: number, index?: number) => {
    let newCategories = [...categories];
    try {
      let data = await getCategoriesFromApi(id);
      if (index !== undefined) {
        newCategories[index + 1] = data;
      } else {
        newCategories[0] = data;
      }
      setCategories(newCategories);
      console.log(categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
    console.log(categories);
  }, []);

  return (
    <div style={{marginTop:"10px"}}>
      {categories.length !== 0 &&
        categories.map((catList, index) => 
          index < 2 && (
            <Row>
              <Slide slidesToShow={catList.length < 4 ? catList.length : 5}>
                {Object.values(catList).map((cat) => {
                  return (
                    <div
                      key={cat.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundSize: "cover",
                        height: "100px",
                      
                      }}
                      onClick={() => {
                        let newSelected = [...selected];
                        if (categories.length > index + 1) {
                          newSelected.length = index + 1;
                          categories.length = index + 1;
                        }
                        newSelected[index] = cat.id;
                        setSelected(newSelected);
                        setCategories(categories);
                        if (newSelected.includes(cat.id))
                          getCategories(cat.id, index);
                      }}
                    >
                      <Label
                        key={cat.id}
                        selected={selected.includes(cat.id)}
                        {...cat}
                      />
                    </div>
                  );
                })}
              </Slide>
            </Row>
          )
        )}
    </div>
  );
}