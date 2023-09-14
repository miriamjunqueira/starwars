import PlanetsContext, { PlanetsContextType } from './PlanetsContext';
import Table from '../pages/Table';

function PlanetsProvider() {
  return (
    <PlanetsContext.Provider value={ {} as PlanetsContextType }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
