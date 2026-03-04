import type { Component } from 'svelte';

export type WindowState = {
	id: string;
	programId: string;
	title: string;
	icon: string;
	x: number;
	y: number;
	width: number;
	height: number;
	minWidth: number;
	minHeight: number;
	zIndex: number;
	minimized: boolean;
	maximized: boolean;
	prevBounds?: { x: number; y: number; width: number; height: number };
};

export type DesktopIconDef = {
	id: string;
	label: string;
	icon: string;
	programId: string;
};

export type Program = {
	id: string;
	name: string;
	icon: string;
	component: Component<any>;
	defaultWidth: number;
	defaultHeight: number;
	minWidth: number;
	minHeight: number;
};

export type StartMenuItem = {
	label: string;
	icon: string;
	programId?: string;
	href?: string;
	separator?: boolean;
	bold?: boolean;
};

export type ContextMenuItem = {
	label: string;
	action?: () => void;
	separator?: boolean;
};

export type ContextMenuState = {
	x: number;
	y: number;
	items: ContextMenuItem[];
} | null;

export type SystemPhase = 'boot' | 'login' | 'desktop' | 'shutdown';
