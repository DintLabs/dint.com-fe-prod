import styled from 'styled-components';

interface FlexProps {
  fd?: string;
  fWrap?: string;
  jc?: string;
  ai?: string;
  gap?: string;

  p?: string;
  m?: string;
  w?: string;
  h?: string;

  minH?: string;
  minW?: string;
  bg?: string;
  color?: string;

  pos?: string;
  pos_T?: string;
  pos_L?: string;
  pos_R?: string;
  pos_B?: string;

  cursor?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ fd }) => fd && `flex-direction: ${fd}`};
  ${({ fWrap }) => fWrap && `flex-wrap: ${fWrap}`};
  ${({ jc }) => jc && `justify-content:${jc}`};
  ${({ ai }) => ai && `align-items:${ai}`};
  ${({ gap }) => gap && `gap:${gap}`};

  ${({ p }) => p && `padding: ${p}`};
  ${({ m }) => m && `margin: ${m}`};
  ${({ w }) => w && `width: ${w}`};
  ${({ h }) => h && `height: ${h}`};
  ${({ minW }) => minW && `min-width: ${minW}`};
  ${({ minH }) => minH && `min-height: ${minH}`};

  ${({ bg }) => bg && `background: ${bg}`};
  ${({ color }) => color && `color: ${color}`};

  ${({ pos }) => pos && `position: ${pos}`};
  ${({ pos_T }) => pos_T && `top: ${pos_T}`};
  ${({ pos_L }) => pos_L && `left: ${pos_L}`};
  ${({ pos_R }) => pos_R && `right: ${pos_R}`};
  ${({ pos_B }) => pos_B && `bottom: ${pos_B}`};
  ${({ cursor }) => cursor && `cursor: ${cursor}`};
`;

export const FlexCol = styled(Flex)`
  flex-direction: column;
`;

export const FlexRow = styled(Flex)`
  flex-direction: row;
`;
