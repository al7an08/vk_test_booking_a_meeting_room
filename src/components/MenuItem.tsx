import React, { PropsWithChildren } from 'react'
import styled from "styled-components";


type Props = {
    active?: boolean;
    disabled?: boolean;
    value: any;
    onClick?(): void;
} & React.HTMLAttributes<HTMLDivElement>



const MenuItem = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {

    const { active, disabled, value, ...rest } = props;

    return (
        <Root {...rest} ref={ref} disabled={disabled} active={active}>
            {props.children}
        </Root >
    )
})


const Root = styled.div<{ disabled?: boolean; active?: boolean }>`
  padding: 5px 10px;
  cursor: ${(p) => (p.disabled ? "initial" : "pointer")};
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  background-color: ${(p) => (p.active ? "#6bc0cf" : "transparent")};
`;

export default MenuItem