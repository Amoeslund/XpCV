import type { Component } from 'svelte';
import type { DesktopIconDef, StartMenuItem } from '$lib/types';
import { openProgram } from '$lib/stores/windows';

import AboutMe from '$lib/programs/AboutMe.svelte';
import Resume from '$lib/programs/Resume.svelte';
import Projects from '$lib/programs/Projects.svelte';
import Contact from '$lib/programs/Contact.svelte';
import Notepad from '$lib/programs/Notepad.svelte';
import Minesweeper from '$lib/programs/Minesweeper.svelte';
import Doom from '$lib/programs/Doom.svelte';
import Paint from '$lib/programs/Paint.svelte';
import InternetExplorer from '$lib/programs/InternetExplorer.svelte';
import Run from '$lib/programs/Run.svelte';

type ProgramDef = {
	name: string;
	icon: string;
	component: Component<any>;
	defaultWidth: number;
	defaultHeight: number;
	minWidth: number;
	minHeight: number;
};

export const programRegistry: Record<string, ProgramDef> = {
	about: {
		name: 'About Me',
		icon: '/icons/user.png',
		component: AboutMe,
		defaultWidth: 450,
		defaultHeight: 420,
		minWidth: 350,
		minHeight: 300
	},
	resume: {
		name: 'My Resume',
		icon: '/icons/my-documents.png',
		component: Resume,
		defaultWidth: 500,
		defaultHeight: 500,
		minWidth: 400,
		minHeight: 350
	},
	projects: {
		name: 'My Projects',
		icon: '/icons/folder.png',
		component: Projects,
		defaultWidth: 550,
		defaultHeight: 400,
		minWidth: 450,
		minHeight: 300
	},
	contact: {
		name: 'Contact Me',
		icon: '/icons/outlook.png',
		component: Contact,
		defaultWidth: 400,
		defaultHeight: 450,
		minWidth: 350,
		minHeight: 350
	},
	notepad: {
		name: 'Notepad',
		icon: '/icons/notepad.png',
		component: Notepad,
		defaultWidth: 500,
		defaultHeight: 400,
		minWidth: 300,
		minHeight: 200
	},
	minesweeper: {
		name: 'Minesweeper',
		icon: '/icons/minesweeper.png',
		component: Minesweeper,
		defaultWidth: 180,
		defaultHeight: 250,
		minWidth: 170,
		minHeight: 230
	},
	doom: {
		name: 'DOOM',
		icon: '/icons/doom.png',
		component: Doom,
		defaultWidth: 640,
		defaultHeight: 480,
		minWidth: 320,
		minHeight: 240
	},
	paint: {
		name: 'Paint',
		icon: '/icons/paint.png',
		component: Paint,
		defaultWidth: 600,
		defaultHeight: 450,
		minWidth: 400,
		minHeight: 300
	},
	ie: {
		name: 'Internet Explorer',
		icon: '/icons/ie.png',
		component: InternetExplorer,
		defaultWidth: 700,
		defaultHeight: 500,
		minWidth: 400,
		minHeight: 300
	},
	run: {
		name: 'Run',
		icon: '/icons/run.png',
		component: Run,
		defaultWidth: 400,
		defaultHeight: 200,
		minWidth: 350,
		minHeight: 180
	}
};

export function openProgramById(id: string) {
	const prog = programRegistry[id];
	if (!prog) return;
	openProgram(id, prog.name, prog.icon, prog.defaultWidth, prog.defaultHeight, prog.minWidth, prog.minHeight);
}

export const desktopIcons: DesktopIconDef[] = [
	{ id: 'icon-about', label: 'About Me', icon: '/icons/user.png', programId: 'about' },
	{ id: 'icon-resume', label: 'My Resume', icon: '/icons/my-documents.png', programId: 'resume' },
	{ id: 'icon-projects', label: 'My Projects', icon: '/icons/folder.png', programId: 'projects' },
	{ id: 'icon-contact', label: 'Contact Me', icon: '/icons/outlook.png', programId: 'contact' },
	{ id: 'icon-ie', label: 'Internet Explorer', icon: '/icons/ie.png', programId: 'ie' },
	{ id: 'icon-notepad', label: 'Notepad', icon: '/icons/notepad.png', programId: 'notepad' },
	{ id: 'icon-minesweeper', label: 'Minesweeper', icon: '/icons/minesweeper.png', programId: 'minesweeper' },
	{ id: 'icon-paint', label: 'Paint', icon: '/icons/paint.png', programId: 'paint' },
	{ id: 'icon-doom', label: 'DOOM', icon: '/icons/doom.png', programId: 'doom' }
];

export const startMenuLeft: StartMenuItem[] = [
	{ label: 'Internet Explorer', icon: '/icons/ie.png', programId: 'ie', bold: true },
	{ label: 'Contact Me', icon: '/icons/outlook.png', programId: 'contact', bold: true },
	{ separator: true, label: '', icon: '' },
	{ label: 'About Me', icon: '/icons/user.png', programId: 'about' },
	{ label: 'My Resume', icon: '/icons/my-documents.png', programId: 'resume' },
	{ label: 'My Projects', icon: '/icons/folder.png', programId: 'projects' },
	{ separator: true, label: '', icon: '' },
	{ label: 'Paint', icon: '/icons/paint-16.png', programId: 'paint' },
	{ label: 'Notepad', icon: '/icons/notepad-16.png', programId: 'notepad' },
	{ label: 'Minesweeper', icon: '/icons/minesweeper.png', programId: 'minesweeper' },
	{ label: 'DOOM', icon: '/icons/doom.png', programId: 'doom' }
];

export const startMenuRight: StartMenuItem[] = [
	{ label: 'My Documents', icon: '/icons/my-documents.png', programId: 'resume', bold: true },
	{ label: 'My Computer', icon: '/icons/my-computer.png', bold: true },
	{ separator: true, label: '', icon: '' },
	{ label: 'LinkedIn', icon: '/icons/linkedin.svg', href: 'https://linkedin.com/in/amoeslund' },
	{ label: 'GitHub', icon: '/icons/github.png', href: 'https://github.com/Amoeslund' },
	{ label: 'amoeslund.dk', icon: '/icons/earth.png', href: 'https://amoeslund.dk' },
	{ separator: true, label: '', icon: '' },
	{ label: 'Help and Support', icon: '/icons/help.png' },
	{ label: 'Search', icon: '/icons/search.png' },
	{ label: 'Run...', icon: '/icons/run.png', programId: 'run' }
];
