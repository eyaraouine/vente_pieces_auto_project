import React from 'react';

export default function AboutUsPage() {

  return (

    <div className="container"  >

      <div className="row">
        <div className="col-md-6">
          <h2 style={{ margin: "60px",fontSize:"60px",fontFamily:"Lilita One" }}>SoukPiecesCasse</h2>
          <p style={{ fontFamily: "Didact Gothic", fontSize: "20px",margin:"60px" }}>
          Chez SoukPiecesCasse, nous sommes passionnés par les voitures et nous comprenons l'importance de maintenir et de réparer votre véhicule avec des pièces de qualité. Notre site est dédié à vous fournir un large choix de pièces détachées de voitures d'occasion pour répondre à vos besoins et vous aider à économiser sur les coûts de réparation.
        Que vous recherchiez des pièces moteur, des composants électroniques, des accessoires intérieurs ou extérieurs, nous avons un large éventail de pièces de différentes marques, modèles et années de fabrication. Notre interface conviviale de recherche et de navigation vous permet de trouver rapidement les pièces spécifiques dont vous avez besoin, en filtrant par catégorie, marque, modèle et autres critères pertinents.
        </p>
        </div>
        <div className="col-md-6 text-md-end">

          <img src="/logo_app.png" alt="logo" style={{height:"650px"}}/>
        </div>
      </div>
    </div>
    
  );
};