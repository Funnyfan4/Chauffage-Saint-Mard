import React, { useState } from 'react';

const App = () => {
  import React, { useState } from 'react';

const App = () => {
  // Données de base
  const [prixMazout, setPrixMazout] = useState(0.9);
  const [quantiteMazout, setQuantiteMazout] = useState(1000);
  
  // Compteurs boiler et chauffages
  const [boilerAncien, setBoilerAncien] = useState(0);
  const [boilerNouveau, setBoilerNouveau] = useState(0);
  
  // Acomptes
  const [acomptes, setAcomptes] = useState({
    md: 500,
    mg: 500,
    studioAvant: 300,
    studioArriere: 300
  });
  
  // Maison de Droite
  const [mdChauffageSolAncien, setMdChauffageSolAncien] = useState(0);
  const [mdChauffageSolNouveau, setMdChauffageSolNouveau] = useState(0);
  const [mdRadiateursAncien, setMdRadiateursAncien] = useState(0);
  const [mdRadiateursNouveau, setMdRadiateursNouveau] = useState(0);
  const [mdEcsAncien, setMdEcsAncien] = useState(0);
  const [mdEcsNouveau, setMdEcsNouveau] = useState(0);
  
  // Maison de Gauche
  const [mgChauffageSolAncien, setMgChauffageSolAncien] = useState(0);
  const [mgChauffageSolNouveau, setMgChauffageSolNouveau] = useState(0);
  const [mgRadiateursAncien, setMgRadiateursAncien] = useState(0);
  const [mgRadiateursNouveau, setMgRadiateursNouveau] = useState(0);
  const [mgEcsAncien, setMgEcsAncien] = useState(0);
  const [mgEcsNouveau, setMgEcsNouveau] = useState(0);
  
  // Studio Avant
  const [studioAvantChauffageAncien, setStudioAvantChauffageAncien] = useState(0);
  const [studioAvantChauffageNouveau, setStudioAvantChauffageNouveau] = useState(0);
  const [studioAvantEcsAncien, setStudioAvantEcsAncien] = useState(0);
  const [studioAvantEcsNouveau, setStudioAvantEcsNouveau] = useState(0);
  
  // Studio Arrière
  const [studioArriereChauffageAncien, setStudioArriereChauffageAncien] = useState(0);
  const [studioArriereChauffageNouveau, setStudioArriereChauffageNouveau] = useState(0);
  const [studioArriereEcsAncien, setStudioArriereEcsAncien] = useState(0);
  const [studioArriereEcsNouveau, setStudioArriereEcsNouveau] = useState(0);
  
  // Résultats
  const [resultats, setResultats] = useState(null);
  
  // Calcul des charges
  const calculerCharges = () => {
    // Coût total du mazout
    const coutTotal = prixMazout * quantiteMazout;
    
    // Consommations de chauffage en kWh
    const consommationMdChauffage = 
      (mdChauffageSolNouveau - mdChauffageSolAncien) + 
      (mdRadiateursNouveau - mdRadiateursAncien);
    
    const consommationMgChauffage = 
      (mgChauffageSolNouveau - mgChauffageSolAncien) + 
      (mgRadiateursNouveau - mgRadiateursAncien);
    
    const consommationStudioAvantChauffage = 
      studioAvantChauffageNouveau - studioAvantChauffageAncien;
    
    const consommationStudioArriereChauffage = 
      studioArriereChauffageNouveau - studioArriereChauffageAncien;
    
    // Consommation du boiler en kWh
    const consommationBoiler = boilerNouveau - boilerAncien;
    
    // Consommation totale en kWh
    const consommationTotaleChauffage = 
      consommationMdChauffage + 
      consommationMgChauffage + 
      consommationStudioAvantChauffage + 
      consommationStudioArriereChauffage + 
      consommationBoiler;
    
    // Prix par kWh
    const prixParKWh = consommationTotaleChauffage > 0 
      ? coutTotal / consommationTotaleChauffage 
      : 0;
    
    // Consommations d'eau chaude sanitaire en m³
    const consommationMdEcs = mdEcsNouveau - mdEcsAncien;
    const consommationMgEcs = mgEcsNouveau - mgEcsAncien;
    const consommationStudioAvantEcs = studioAvantEcsNouveau - studioAvantEcsAncien;
    const consommationStudioArriereEcs = studioArriereEcsNouveau - studioArriereEcsAncien;
    
    // Consommation totale d'eau chaude sanitaire
    const consommationTotaleEcs = 
      consommationMdEcs + 
      consommationMgEcs + 
      consommationStudioAvantEcs + 
      consommationStudioArriereEcs;
    
    // Coût total du boiler
    const coutBoiler = consommationBoiler * prixParKWh;
    
    // Calcul des charges pour chaque logement
    
    // Maison de Droite
    const mdChauffage = consommationMdChauffage * prixParKWh;
    const mdEcs = consommationTotaleEcs > 0 
      ? (consommationMdEcs / consommationTotaleEcs) * coutBoiler 
      : 0;
    const mdTotal = mdChauffage + mdEcs;
    const mdSolde = mdTotal - acomptes.md;
    
    // Maison de Gauche
    const mgChauffage = consommationMgChauffage * prixParKWh;
    const mgEcs = consommationTotaleEcs > 0 
      ? (consommationMgEcs / consommationTotaleEcs) * coutBoiler 
      : 0;
    const mgTotal = mgChauffage + mgEcs;
    const mgSolde = mgTotal - acomptes.mg;
    
    // Studio Avant
    const studioAvantChauffage = consommationStudioAvantChauffage * prixParKWh;
    const studioAvantEcs = consommationTotaleEcs > 0 
      ? (consommationStudioAvantEcs / consommationTotaleEcs) * coutBoiler 
      : 0;
    const studioAvantTotal = studioAvantChauffage + studioAvantEcs;
    const studioAvantSolde = studioAvantTotal - acomptes.studioAvant;
    
    // Studio Arrière
    const studioArriereChauffage = consommationStudioArriereChauffage * prixParKWh;
    const studioArriereEcs = consommationTotaleEcs > 0 
      ? (consommationStudioArriereEcs / consommationTotaleEcs) * coutBoiler 
      : 0;
    const studioArriereTotal = studioArriereChauffage + studioArriereEcs;
    const studioArriereSolde = studioArriereTotal - acomptes.studioArriere;
    
    // Totaux
    const totalChauffage = mdChauffage + mgChauffage + studioAvantChauffage + studioArriereChauffage;
    const totalEcs = mdEcs + mgEcs + studioAvantEcs + studioArriereEcs;
    const totalGeneral = totalChauffage + totalEcs;
    const totalAcomptes = acomptes.md + acomptes.mg + acomptes.studioAvant + acomptes.studioArriere;
    const totalSolde = totalGeneral - totalAcomptes;
    
    // Mise à jour des résultats
    setResultats({
      prixParKWh,
      md: {
        consommationChauffage: consommationMdChauffage,
        consommationEcs: consommationMdEcs,
        chauffage: mdChauffage,
        ecs: mdEcs,
        total: mdTotal,
        acompte: acomptes.md,
        solde: mdSolde
      },
      mg: {
        consommationChauffage: consommationMgChauffage,
        consommationEcs: consommationMgEcs,
        chauffage: mgChauffage,
        ecs: mgEcs,
        total: mgTotal,
        acompte: acomptes.mg,
        solde: mgSolde
      },
      studioAvant: {
        consommationChauffage: consommationStudioAvantChauffage,
        consommationEcs: consommationStudioAvantEcs,
        chauffage: studioAvantChauffage,
        ecs: studioAvantEcs,
        total: studioAvantTotal,
        acompte: acomptes.studioAvant,
        solde: studioAvantSolde
      },
      studioArriere: {
        consommationChauffage: consommationStudioArriereChauffage,
        consommationEcs: consommationStudioArriereEcs,
        chauffage: studioArriereChauffage,
        ecs: studioArriereEcs,
        total: studioArriereTotal,
        acompte: acomptes.studioArriere,
        solde: studioArriereSolde
      },
      totaux: {
        chauffage: totalChauffage,
        ecs: totalEcs,
        total: totalGeneral,
        acomptes: totalAcomptes,
        solde: totalSolde
      }
    });
  };
  
  // Sauvegarder les relevés actuels
  const sauvegarderReleves = () => {
    // Mettre à jour les anciens relevés avec les nouveaux
    setBoilerAncien(boilerNouveau);
    
    // Maison de Droite
    setMdChauffageSolAncien(mdChauffageSolNouveau);
    setMdRadiateursAncien(mdRadiateursNouveau);
    setMdEcsAncien(mdEcsNouveau);
    
    // Maison de Gauche
    setMgChauffageSolAncien(mgChauffageSolNouveau);
    setMgRadiateursAncien(mgRadiateursNouveau);
    setMgEcsAncien(mgEcsNouveau);
    
    // Studio Avant
    setStudioAvantChauffageAncien(studioAvantChauffageNouveau);
    setStudioAvantEcsAncien(studioAvantEcsNouveau);
    
    // Studio Arrière
    setStudioArriereChauffageAncien(studioArriereChauffageNouveau);
    setStudioArriereEcsAncien(studioArriereEcsNouveau);
    
    alert('Relevés sauvegardés avec succès!');
  };
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Calculateur de Charges de Chauffage - Copropriété Saint-Mard</h1>
      
      {/* Informations générales */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Informations générales</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Prix du mazout (€/L)</label>
            <input 
              type="number" 
              step="0.01" 
              value={prixMazout} 
              onChange={(e) => setPrixMazout(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantité de mazout (L)</label>
            <input 
              type="number" 
              value={quantiteMazout} 
              onChange={(e) => setQuantiteMazout(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mt-2">
          <p>Montant total du mazout: <strong>{(prixMazout * quantiteMazout).toFixed(2)} €</strong></p>
          {resultats && (
            <p>Prix unitaire par kWh: <strong>{resultats.prixParKWh.toFixed(4)} €/kWh</strong></p>
          )}
        </div>
      </div>
      
      {/* Compteur boiler */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Compteur boiler ECS (kWh)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ancien relevé</label>
            <input 
              type="number" 
              value={boilerAncien}
              onChange={(e) => setBoilerAncien(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nouveau relevé</label>
            <input 
              type="number" 
              value={boilerNouveau}
              onChange={(e) => setBoilerNouveau(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mt-2">
          <p>Consommation: <strong>{boilerNouveau - boilerAncien} kWh</strong></p>
        </div>
      </div>
      
      {/* Acomptes versés */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Acomptes versés</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Maison de Droite</label>
            <input 
              type="number" 
              value={acomptes.md}
              onChange={(e) => setAcomptes({...acomptes, md: parseFloat(e.target.value) || 0})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Maison de Gauche</label>
            <input 
              type="number" 
              value={acomptes.mg}
              onChange={(e) => setAcomptes({...acomptes, mg: parseFloat(e.target.value) || 0})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Studio Avant</label>
            <input 
              type="number" 
              value={acomptes.studioAvant}
              onChange={(e) => setAcomptes({...acomptes, studioAvant: parseFloat(e.target.value) || 0})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Studio Arrière</label>
            <input 
              type="number" 
              value={acomptes.studioArriere}
              onChange={(e) => setAcomptes({...acomptes, studioArriere: parseFloat(e.target.value) || 0})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
      
      {/* Maison de Droite */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Maison de Droite (MD)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Chauffage Sol (kWh)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mdChauffageSolAncien}
                  onChange={(e) => setMdChauffageSolAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mdChauffageSolNouveau}
                  onChange={(e) => setMdChauffageSolNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Radiateurs (kWh)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mdRadiateursAncien}
                  onChange={(e) => setMdRadiateursAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mdRadiateursNouveau}
                  onChange={(e) => setMdRadiateursNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Eau Chaude (m³)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mdEcsAncien}
                  onChange={(e) => setMdEcsAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mdEcsNouveau}
                  onChange={(e) => setMdEcsNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Maison de Gauche */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Maison de Gauche (MG)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Chauffage Sol (kWh)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mgChauffageSolAncien}
                  onChange={(e) => setMgChauffageSolAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mgChauffageSolNouveau}
                  onChange={(e) => setMgChauffageSolNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Radiateurs (kWh)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mgRadiateursAncien}
                  onChange={(e) => setMgRadiateursAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mgRadiateursNouveau}
                  onChange={(e) => setMgRadiateursNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Eau Chaude (m³)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mgEcsAncien}
                  onChange={(e) => setMgEcsAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={mgEcsNouveau}
                  onChange={(e) => setMgEcsNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Studio Avant */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Studio Avant</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Chauffage (kWh)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={studioAvantChauffageAncien}
                  onChange={(e) => setStudioAvantChauffageAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={studioAvantChauffageNouveau}
                  onChange={(e) => setStudioAvantChauffageNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Eau Chaude (m³)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={studioAvantEcsAncien}
                  onChange={(e) => setStudioAvantEcsAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={studioAvantEcsNouveau}
                  onChange={(e) => setStudioAvantEcsNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Studio Arrière */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Studio Arrière</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Chauffage (kWh)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={studioArriereChauffageAncien}
                  onChange={(e) => setStudioArriereChauffageAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={studioArriereChauffageNouveau}
                  onChange={(e) => setStudioArriereChauffageNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Eau Chaude (m³)</label>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={studioArriereEcsAncien}
                  onChange={(e) => setStudioArriereEcsAncien(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="Ancien"
                />
              </div>
              <div className="w-1/2">
                <input 
                  type="number" 
                  value={studioArriereEcsNouveau}
                  onChange={(e) => setStudioArriereEcsNouveau(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="Nouveau"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button 
          onClick={calculerCharges} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Calculer les charges
        </button>
        
        <button 
          onClick={sauvegarderReleves} 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Sauvegarder les relevés
        </button>
      </div>
      
      {/* Résultats */}
      {resultats && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Résultats du calcul</h2>
          
          <table className="w-full border-collapse mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-left">Logement</th>
                <th className="border p-2 text-left">Chauffage (kWh)</th>
                <th className="border p-2 text-left">Montant Chauffage</th>
                <th className="border p-2 text-left">ECS (m³)</th>
                <th className="border p-2 text-left">Montant ECS</th>
                <th className="border p-2 text-left">Total</th>
                <th className="border p-2 text-left">Acompte</th>
                <th className="border p-2 text-left">Solde</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Maison de Droite</td>
                <td className="border p-2">{resultats.md.consommationChauffage.toFixed(0)}</td>
                <td className="border p-2">{resultats.md.chauffage.toFixed(2)} €</td>
                <td className="border p-2">{resultats.md.consommationEcs.toFixed(1)}</td>
                <td className="border p-2">{resultats.md.ecs.toFixed(2)} €</td>
                <td className="border p-2">{resultats.md.total.toFixed(2)} €</td>
                <td className="border p-2">{resultats.md.acompte.toFixed(2)} €</td>
                <td className="border p-2 font-bold">{resultats.md.solde.toFixed(2)} €</td>
              </tr>
              <tr>
                <td className="border p-2">Maison de Gauche</td>
                <td className="border p-2">{resultats.mg.consommationChauffage.toFixed(0)}</td>
                <td className="border p-2">{resultats.mg.chauffage.toFixed(2)} €</td>
                <td className="border p-2">{resultats.mg.consommationEcs.toFixed(1)}</td>
                <td className="border p-2">{resultats.mg.ecs.toFixed(2)} €</td>
                <td className="border p-2">{resultats.mg.total.toFixed(2)} €</td>
                <td className="border p-2">{resultats.mg.acompte.toFixed(2)} €</td>
                <td className="border p-2 font-bold">{resultats.mg.solde.toFixed(2)} €</td>
              </tr>
              <tr>
                <td className="border p-2">Studio Avant</td>
                <td className="border p-2">{resultats.studioAvant.consommationChauffage.toFixed(0)}</td>
                <td className="border p-2">{resultats.studioAvant.chauffage.toFixed(2)} €</td>
                <td className="border p-2">{resultats.studioAvant.consommationEcs.toFixed(1)}</td>
                <td className="border p-2">{resultats.studioAvant.ecs.toFixed(2)} €</td>
                <td className="border p-2">{resultats.studioAvant.total.toFixed(2)} €</td>
                <td className="border p-2">{resultats.studioAvant.acompte.toFixed(2)} €</td>
                <td className="border p-2 font-bold">{resultats.studioAvant.solde.toFixed(2)} €</td>
              </tr>
              <tr>
                <td className="border p-2">Studio Arrière</td>
                <td className="border p-2">{resultats.studioArriere.consommationChauffage.toFixed(0)}</td>
                <td className="border p-2">{resultats.studioArriere.chauffage.toFixed(2)} €</td>
                <td className="border p-2">{resultats.studioArriere.consommationEcs.toFixed(1)}</td>
                <td className="border p-2">{resultats.studioArriere.ecs.toFixed(2)} €</td>
                <td className="border p-2">{resultats.studioArriere.total.toFixed(2)} €</td>
                <td className="border p-2">{resultats.studioArriere.acompte.toFixed(2)} €</td>
                <td className="border p-2 font-bold">{resultats.studioArriere.solde.toFixed(2)} €</td>
              </tr>
              <tr className="bg-gray-200 font-bold">
                <td className="border p-2">TOTAL</td>
                <td className="border p-2">{(resultats.md.consommationChauffage + resultats.mg.consommationChauffage + resultats.studioAvant.consommationChauffage + resultats.studioArriere.consommationChauffage).toFixed(0)}</td>
                <td className="border p-2">{resultats.totaux.chauffage.toFixed(2)} €</td>
                <td className="border p-2">{(resultats.md.consommationEcs + resultats.mg.consommationEcs + resultats.studioAvant.consommationEcs + resultats.studioArriere.consommationEcs).toFixed(1)}</td>
                <td className="border p-2">{resultats.totaux.ecs.toFixed(2)} €</td>
                <td className="border p-2">{resultats.totaux.total.toFixed(2)} €</td>
                <td className="border p-2">{resultats.totaux.acomptes.toFixed(2)} €</td>
                <td className="border p-2">{resultats.totaux.solde.toFixed(2)} €</td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Informations détaillées</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-2">Boiler eau chaude sanitaire</h4>
                <p>Consommation: {boilerNouveau - boilerAncien} kWh</p>
                <p>Coût: {(consommationBoiler * resultats.prixParKWh).toFixed(2)} €</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-2">Prix unitaires</h4>
                <p>Prix du mazout: {prixMazout.toFixed(2)} €/L</p>
                <p>Prix unitaire par kWh: {resultats.prixParKWh.toFixed(4)} €/kWh</p>
                <p>Coût total du mazout: {(prixMazout * quantiteMazout).toFixed(2)} €</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-2">Maison de Droite - Détails</h4>
                <p>Chauffage Sol: {mdChauffageSolNouveau - mdChauffageSolAncien} kWh</p>
                <p>Radiateurs: {mdRadiateursNouveau - mdRadiateursAncien} kWh</p>
                <p>Total chauffage: {resultats.md.consommationChauffage} kWh</p>
                <p>Eau chaude: {resultats.md.consommationEcs} m³</p>
                <p className="mt-2">Total à payer: {resultats.md.solde.toFixed(2)} €</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-2">Maison de Gauche - Détails</h4>
                <p>Chauffage Sol: {mgChauffageSolNouveau - mgChauffageSolAncien} kWh</p>
                <p>Radiateurs: {mgRadiateursNouveau - mgRadiateursAncien} kWh</p>
                <p>Total chauffage: {resultats.mg.consommationChauffage} kWh</p>
                <p>Eau chaude: {resultats.mg.consommationEcs} m³</p>
                <p className="mt-2">Total à payer: {resultats.mg.solde.toFixed(2)} €</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-2">Studio Avant - Détails</h4>
                <p>Chauffage: {resultats.studioAvant.consommationChauffage} kWh</p>
                <p>Eau chaude: {resultats.studioAvant.consommationEcs} m³</p>
                <p className="mt-2">Total à payer: {resultats.studioAvant.solde.toFixed(2)} €</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <h4 className="font-medium mb-2">Studio Arrière - Détails</h4>
                <p>Chauffage: {resultats.studioArriere.consommationChauffage} kWh</p>
                <p>Eau chaude: {resultats.studioArriere.consommationEcs} m³</p>
                <p className="mt-2">Total à payer: {resultats.studioArriere.solde.toFixed(2)} €</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mode d'emploi */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Mode d'emploi</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>Entrez le prix du mazout et la quantité achetée.</li>
          <li>Saisissez les acomptes déjà versés pour chaque logement, s'il y en a.</li>
          <li>Entrez les relevés des compteurs (anciens et nouveaux) pour chaque logement.</li>
          <li>Cliquez sur "Calculer les charges" pour voir la répartition des coûts.</li>
          <li>Cliquez sur "Sauvegarder les relevés" pour utiliser les valeurs actuelles comme référence pour la prochaine période.</li>
        </ol>
        <div className="mt-3 text-sm">
          <p><strong>Méthode de calcul :</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Le prix par kWh est calculé en divisant le coût total du mazout par la consommation totale en kWh (logements + boiler).</li>
            <li>Pour chaque logement, le montant du chauffage est sa consommation multipliée par le prix par kWh.</li>
            <li>Le coût du boiler est réparti entre les logements proportionnellement à leur consommation d'eau chaude sanitaire.</li>
            <li>Le solde à payer est calculé en soustrayant l'acompte versé du total des charges (chauffage + eau chaude).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Contenu de votre application */}
    </div>
  );
};

export default App;
