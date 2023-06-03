import React, { useRef, FC } from "react";

interface Item {
    title: string;
}

interface MenuItemsProps {
    items: Item;
}

export const MenuItems: FC<MenuItemsProps> = ({ items }) => {
    let ref = useRef<HTMLLIElement>(null);

    return (
        <li
            className="menu-items"
            ref={ref}
        >
            <a href="/#">{items.title}</a>
        </li>
    );
};

export default MenuItems;
