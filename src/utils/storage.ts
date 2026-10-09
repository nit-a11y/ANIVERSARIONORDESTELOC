import { GuestRsvp, MuralMessage, SongTrack } from '../types';

const RSVP_KEY = 'nordeste_15anos_rsvps';
const MURAL_KEY = 'nordeste_15anos_mural';
const SONGS_KEY = 'nordeste_15anos_songs';

const INITIAL_MURAL: MuralMessage[] = [
  {
    id: 'm1',
    author: 'Diretoria Executiva',
    department: 'Diretoria',
    message: '15 anos construindo caminhos, alugando soluções e, acima de tudo, formando uma família de pessoas dedicadas. Nosso maior orgulho é cada um de vocês!',
    likes: 42,
    timeAgo: 'Hoje, 09:15',
    avatarSeed: 'diretoria',
  },
  {
    id: 'm2',
    author: 'Cláudio Ferreira',
    department: 'Logística & Frotas',
    message: 'Já separei a camisa florida mais chamativa do armário! Ninguém me tira da beira da praia nesse dia!',
    likes: 27,
    timeAgo: 'Hoje, 10:04',
    avatarSeed: 'claudio',
  },
  {
    id: 'm3',
    author: 'Mariana Santos',
    department: 'Financeiro',
    message: 'Achamos que íamos ter que alugar smoking... Que alívio ver que é praia com água de coco e cerveja gelada! Parabéns Nordeste pelos 15 anos!',
    likes: 35,
    timeAgo: 'Ontem',
    avatarSeed: 'mariana',
  },
  {
    id: 'm4',
    author: 'Tiago Rocha',
    department: 'Manutenção & Oficina',
    message: '15 anos que nossa equipe não deixa máquina parada. Essa festa vai ser histórica!',
    likes: 19,
    timeAgo: 'Ontem',
    avatarSeed: 'tiago',
  },
  {
    id: 'm5',
    author: 'Patrícia Lima',
    department: 'Comercial & Vendas',
    message: 'Contando os minutos pra comemorar com os melhores clientes e a melhor equipe do Nordeste!',
    likes: 31,
    timeAgo: 'Há 2 dias',
    avatarSeed: 'patricia',
  },
];

const INITIAL_SONGS: SongTrack[] = [
  { id: 's1', title: 'Pequena Eva / Eva', artist: 'Banda Eva', genre: 'Axé Retrô', votes: 38 },
  { id: 's2', title: 'Anunciação', artist: 'Alceu Valença', genre: 'MPB / Nordestino', votes: 45 },
  { id: 's3', title: 'Prefixo de Verão', artist: 'Banda Mel', genre: 'Axé Clássico', votes: 29 },
  { id: 's4', title: 'Esperando na Janela', artist: 'Gilberto Gil', genre: 'Forró / MPB', votes: 34 },
  { id: 's5', title: 'Faraó (Divindade do Egito)', artist: 'Olodum', genre: 'Samba-Reggae', votes: 41 },
  { id: 's6', title: 'Burguesinha', artist: 'Seu Jorge', genre: 'Samba Rock', votes: 26 },
  { id: 's7', title: 'De Ladinho', artist: 'Terra Samba', genre: 'Axé Raiz', votes: 22 },
  { id: 's8', title: 'Praieiro', artist: 'Jammil e Uma Noites', genre: 'Micareta', votes: 36 },
];

const INITIAL_RSVPS: GuestRsvp[] = [
  {
    id: 'r1',
    fullName: 'Roberto Albuquerque',
    department: 'Diretoria',
    phone: '(71) 99123-4567',
    attending: true,
    hasGuest: true,
    guestName: 'Carla Albuquerque',
    needVan: false,
    foodPreference: 'frutos_do_mar',
    drinkPreference: 'cerveja',
    createdAt: '2026-10-08T14:20:00.000Z',
  },
  {
    id: 'r2',
    fullName: 'Mariana Santos',
    department: 'Financeiro',
    phone: '(71) 98765-4321',
    attending: true,
    hasGuest: true,
    guestName: 'Lucas Andrade',
    needVan: true,
    foodPreference: 'churrasco',
    drinkPreference: 'caipirinha',
    createdAt: '2026-10-08T15:30:00.000Z',
  },
  {
    id: 'r3',
    fullName: 'Cláudio Ferreira',
    department: 'Logística & Frotas',
    phone: '(71) 99234-5678',
    attending: true,
    hasGuest: false,
    needVan: true,
    foodPreference: 'churrasco',
    drinkPreference: 'cerveja',
    createdAt: '2026-10-09T08:15:00.000Z',
  },
  {
    id: 'r4',
    fullName: 'Ana Beatriz Souza',
    department: 'Comercial & Vendas',
    phone: '(71) 99888-1122',
    attending: true,
    hasGuest: true,
    guestName: 'Felipe Souza',
    needVan: false,
    foodPreference: 'frutos_do_mar',
    drinkPreference: 'nao_alcoolico',
    createdAt: '2026-10-09T09:40:00.000Z',
  },
];

export function getRsvps(): GuestRsvp[] {
  try {
    const data = localStorage.getItem(RSVP_KEY);
    if (!data) {
      localStorage.setItem(RSVP_KEY, JSON.stringify(INITIAL_RSVPS));
      return INITIAL_RSVPS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_RSVPS;
  }
}

export function saveRsvp(rsvp: Omit<GuestRsvp, 'id' | 'createdAt'>): GuestRsvp {
  const list = getRsvps();
  const newRsvp: GuestRsvp = {
    ...rsvp,
    id: 'rsvp_' + Date.now(),
    createdAt: new Date().toISOString(),
  };
  const updated = [newRsvp, ...list];
  localStorage.setItem(RSVP_KEY, JSON.stringify(updated));
  return newRsvp;
}

export function getMuralMessages(): MuralMessage[] {
  try {
    const data = localStorage.getItem(MURAL_KEY);
    if (!data) {
      localStorage.setItem(MURAL_KEY, JSON.stringify(INITIAL_MURAL));
      return INITIAL_MURAL;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_MURAL;
  }
}

export function addMuralMessage(author: string, department: string, message: string): MuralMessage {
  const list = getMuralMessages();
  const newMsg: MuralMessage = {
    id: 'msg_' + Date.now(),
    author,
    department,
    message,
    likes: 1,
    timeAgo: 'Agora mesmo',
    avatarSeed: author.toLowerCase().replace(/\s+/g, ''),
  };
  const updated = [newMsg, ...list];
  localStorage.setItem(MURAL_KEY, JSON.stringify(updated));
  return newMsg;
}

export function likeMuralMessage(id: string): MuralMessage[] {
  const list = getMuralMessages();
  const updated = list.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m));
  localStorage.setItem(MURAL_KEY, JSON.stringify(updated));
  return updated;
}

export function getSongs(): SongTrack[] {
  try {
    const data = localStorage.getItem(SONGS_KEY);
    if (!data) {
      localStorage.setItem(SONGS_KEY, JSON.stringify(INITIAL_SONGS));
      return INITIAL_SONGS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_SONGS;
  }
}

export function voteSong(id: string): SongTrack[] {
  const list = getSongs();
  const updated = list.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s));
  updated.sort((a, b) => b.votes - a.votes);
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated));
  return updated;
}

export function addSongSuggestion(title: string, artist: string, genre: string): SongTrack[] {
  const list = getSongs();
  const newTrack: SongTrack = {
    id: 'song_' + Date.now(),
    title,
    artist,
    genre: genre || 'Escolha dos Convidados',
    votes: 1,
  };
  const updated = [...list, newTrack].sort((a, b) => b.votes - a.votes);
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated));
  return updated;
}

export function exportRsvpsToCsv(rsvps: GuestRsvp[]): void {
  const headers = [
    'Nome Completo',
    'Setor/Departamento',
    'Telefone/WhatsApp',
    'Confirmou Presença',
    'Leva Acompanhante',
    'Nome do Acompanhante',
    'Precisa de Van',
    'Preferência Alimentar',
    'Bebida Preferida',
    'Data de Confirmação',
  ];

  const rows = rsvps.map((r) => [
    `"${r.fullName}"`,
    `"${r.department}"`,
    `"${r.phone}"`,
    r.attending ? 'SIM' : 'NÃO',
    r.hasGuest ? 'SIM' : 'NÃO',
    `"${r.guestName || '-'}"`,
    r.needVan ? 'SIM (Sede)' : 'NÃO (Próprio)',
    r.foodPreference === 'churrasco'
      ? 'Churrasco'
      : r.foodPreference === 'frutos_do_mar'
      ? 'Frutos do Mar'
      : 'Vegetariano',
    r.drinkPreference === 'cerveja'
      ? 'Cerveja/Chopp'
      : r.drinkPreference === 'caipirinha'
      ? 'Caipirinha/Drinks'
      : 'Não Alcoólico',
    new Date(r.createdAt).toLocaleString('pt-BR'),
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Confirmados_Baile_Nordeste_15Anos_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
