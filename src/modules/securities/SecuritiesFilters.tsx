import {Select} from 'components/Select';
import {dictionarySelectors, IBoard, ISecurityGroup, ISecurityType} from 'modules/dictionary';
import {atom, useRecoilState, useRecoilValueLoadable} from 'recoil';

const emptyOptionSecurityType: ISecurityType = {id: -1, name: '', title: '-'};

export const securityTypeFilterState = atom({
  key: 'SecuritiesFilters/securityTypeFilterState',
  default: emptyOptionSecurityType,
});

const emptyOptionBoard = {boardId: '', boardTitle: '-'} as IBoard;

export const boardFilterState = atom({
  key: 'SecuritiesFilters/boardFilterState',
  default: emptyOptionBoard,
});

const emptyOptionSecurityGroup = {name: '', title: '-'} as ISecurityGroup;

export const securityGroupFilterState = atom({
  key: 'SecuritiesFilters/securityGroupFilterState',
  default: emptyOptionSecurityGroup,
});

export const SecuritiesFilters = () => {
  const [securityTypeFilter, setSecurityTypeFilter] = useRecoilState(securityTypeFilterState);
  const [boardFilter, setBoardFilter] = useRecoilState(boardFilterState);
  const [securityGroupFilter, setSecurityGroupFilter] = useRecoilState(securityGroupFilterState);

  const loadableSecurityTypes = useRecoilValueLoadable(dictionarySelectors.securityType);
  const loadableBoards = useRecoilValueLoadable(dictionarySelectors.boards);
  const loadableSecurityGroups = useRecoilValueLoadable(dictionarySelectors.securityGroups);

  const securityTypesOptions = loadableSecurityTypes?.state === 'hasValue' ? loadableSecurityTypes.contents : [];
  const boardsOptions = loadableBoards?.state === 'hasValue' ? loadableBoards.contents : [];
  const securityGroupOptions = loadableSecurityGroups?.state === 'hasValue' ? loadableSecurityGroups.contents : [];

  return (
    <div>
      <Select
        label="Тип ценной бумаги"
        selectedOption={securityTypeFilter}
        options={[emptyOptionSecurityType, ...securityTypesOptions]}
        getOptionId={({id}) => id}
        getOptionName={({title}) => title}
        onChange={setSecurityTypeFilter}
      />
      <Select
        label="Режим торгов"
        selectedOption={boardFilter}
        options={[emptyOptionBoard, ...boardsOptions]}
        getOptionId={({boardId}) => boardId}
        getOptionName={({boardTitle}) => boardTitle}
        onChange={setBoardFilter}
      />
      <Select
        label="Тип безопасности"
        selectedOption={securityGroupFilter}
        options={[emptyOptionSecurityGroup, ...securityGroupOptions]}
        getOptionId={({name}) => name}
        getOptionName={({title}) => title}
        onChange={setSecurityGroupFilter}
      />
    </div>
  );
};
