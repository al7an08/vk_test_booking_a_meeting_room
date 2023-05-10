import { useRef, Children, ReactElement, useEffect, ReactNode, useState, isValidElement, cloneElement, PropsWithChildren, useMemo } from 'react'
import styled from "styled-components";
import MenuItem from './MenuItem';

type Props = {
    label: ReactNode;
    onChange: (item: any) => void;
}

const Dropdown = (props: PropsWithChildren<Props>) => {
    const { label, onChange, children } = props;

    const [isOpen, setOpen] = useState(false);

    const [buttonText, setButtonText] = useState('');

    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleOpen = () => (!isOpen ? setOpen(true) : setOpen(false));

    const items = useMemo(() => Children.toArray(children), [children]);

    const elements = useRef<Record<number, HTMLDivElement>>({});

    const indexes = useMemo(() => (
        items.reduce<Array<number>>((result, item, index) => {
            if (isValidElement(item)) {
                if (!item.props.disabled && item.type === MenuItem) {
                    result.push(index)
                }
            }

            return result;
        }, [])
    ), [items]);




    const handleChange = (item: any) => {
        onChange(item);
        setOpen(false);
    }

    return (
        <Root>
            <Control onClick={handleOpen} type='button'>{label}</Control>
            {
                isOpen && (
                    <Menu>
                        {
                            Children.map(children, (child, index) => {
                                if (isValidElement(child)) {
                                    return cloneElement(child as ReactElement,
                                        {
                                            active: index === indexes[highlightedIndex] ? 1 : 0,
                                            onMouseEnter: () => setHighlightedIndex(indexes.indexOf(index)),
                                            onClick: (ev: MouseEvent) => {
                                                ev.stopPropagation();
                                                handleChange(child.props.value);
                                            },
                                            ref: (node: HTMLDivElement) => {
                                                elements.current[index] = node;
                                            }

                                        });
                                }
                            })
                        }
                    </Menu>
                )
            }
        </Root>
    );

};

const Menu = styled.menu`
  margin: 1px 0 0;
  padding: 0;
  border: 1px solid #bebebe;
  max-height: 100px;
  overflow-y: auto;
`;

const Root = styled.div``;

const Control = styled.button`
  width: 100%;
  margin-top: 2%;
  padding: 0;
`;

export default Dropdown