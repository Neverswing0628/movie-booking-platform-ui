// Mock data for movie booking platform

export interface Movie {
  id: string;
  title: string;
  titleKr: string;
  poster: string;
  rating: number;
  genre: string;
  runtime: number;
  releaseDate: string;
  director: string;
  cast: string[];
  synopsis: string;
  ageRating: string;
  status: 'now-playing' | 'coming-soon';
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  screens: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  screenNumber: number;
  startTime: string;
  endTime: string;
  availableSeats: number;
  totalSeats: number;
  price: number;
}

export interface Booking {
  id: string;
  movieTitle: string;
  theaterName: string;
  screenNumber: number;
  date: string;
  time: string;
  seats: string[];
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  bookingDate: string;
}

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Last Guardian',
    titleKr: '라스트 가디언',
    poster: 'https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzExMjk3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 9.2,
    genre: '액션/어드벤처',
    runtime: 142,
    releaseDate: '2026-02-10',
    director: '김철수',
    cast: ['이민호', '김태희', '박서준', '전지현'],
    synopsis: '세상을 구하기 위해 마지막 수호자가 악의 세력에 맞서 싸우는 대서사시. 인류의 운명이 그의 손에 달려있다.',
    ageRating: '12세 관람가',
    status: 'now-playing',
  },
  {
    id: '2',
    title: 'Stellar Odyssey',
    titleKr: '스텔라 오디세이',
    poster: 'https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzExMzc4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.8,
    genre: 'SF/스릴러',
    runtime: 156,
    releaseDate: '2026-02-05',
    director: '박영준',
    cast: ['송강호', '배두나', '이정재', '김혜수'],
    synopsis: '우주 탐사대가 미지의 행성에서 발견한 비밀이 인류의 미래를 바꾼다. 충격적인 반전이 당신을 기다린다.',
    ageRating: '15세 관람가',
    status: 'now-playing',
  },
  {
    id: '3',
    title: 'Love in Paris',
    titleKr: '사랑은 파리에서',
    poster: 'https://images.unsplash.com/photo-1746980931930-d8e69847d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc3MTE0MzQyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 7.9,
    genre: '로맨스/드라마',
    runtime: 118,
    releaseDate: '2026-02-14',
    director: '이나영',
    cast: ['현빈', '손예진', '정해인', '박민영'],
    synopsis: '파리에서 우연히 만난 두 사람의 운명적인 사랑 이야기. 아름다운 파리를 배경으로 펼쳐지는 감동적인 러브스토리.',
    ageRating: '전체 관람가',
    status: 'now-playing',
  },
  {
    id: '4',
    title: 'The Haunting',
    titleKr: '혼령의 집',
    poster: 'https://images.unsplash.com/photo-1769321309399-38d9eda18370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzEwNzExMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.1,
    genre: '공포/스릴러',
    runtime: 105,
    releaseDate: '2026-02-08',
    director: '나홍진',
    cast: ['최민식', '김고은', '유아인', '박신혜'],
    synopsis: '오래된 저택에 숨겨진 끔찍한 비밀. 한번 들어가면 살아나올 수 없다는 저주받은 집의 공포가 시작된다.',
    ageRating: '청소년 관람불가',
    status: 'now-playing',
  },
  {
    id: '5',
    title: 'Hero Returns',
    titleKr: '영웅의 귀환',
    poster: 'https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzExMjk3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.5,
    genre: '액션/판타지',
    runtime: 138,
    releaseDate: '2026-03-01',
    director: '봉준호',
    cast: ['마동석', '이병헌', '하정우', '임시완'],
    synopsis: '사라진 영웅이 10년 만에 돌아왔다. 더 강력해진 적들을 물리치고 세상을 구하기 위한 마지막 전투가 시작된다.',
    ageRating: '12세 관람가',
    status: 'coming-soon',
  },
  {
    id: '6',
    title: 'Mystery Island',
    titleKr: '미스터리 아일랜드',
    poster: 'https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzExMzc4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 7.6,
    genre: '스릴러/미스터리',
    runtime: 128,
    releaseDate: '2026-03-15',
    director: '류승완',
    cast: ['황정민', '유해진', '류준열', '전여빈'],
    synopsis: '무인도에 고립된 7명의 사람들. 하나씩 사라지기 시작하면서 섬에 숨겨진 충격적인 진실이 드러난다.',
    ageRating: '15세 관람가',
    status: 'coming-soon',
  },
];

export const theaters: Theater[] = [
  {
    id: 't1',
    name: '메가박스 강남',
    location: '서울 강남구',
    screens: 12,
  },
  {
    id: 't2',
    name: '메가박스 코엑스',
    location: '서울 강남구',
    screens: 10,
  },
  {
    id: 't3',
    name: '롯데시네마 월드타워',
    location: '서울 송파구',
    screens: 14,
  },
  {
    id: 't4',
    name: '롯데시네마 홍대입구',
    location: '서울 마포구',
    screens: 8,
  },
  {
    id: 't5',
    name: '메가박스 신촌',
    location: '서울 서대문구',
    screens: 9,
  },
];

export const showtimes: Showtime[] = [
  {
    id: 's1',
    movieId: '1',
    theaterId: 't1',
    screenNumber: 1,
    startTime: '10:30',
    endTime: '13:12',
    availableSeats: 84,
    totalSeats: 150,
    price: 14000,
  },
  {
    id: 's2',
    movieId: '1',
    theaterId: 't1',
    screenNumber: 2,
    startTime: '13:30',
    endTime: '16:12',
    availableSeats: 120,
    totalSeats: 150,
    price: 14000,
  },
  {
    id: 's3',
    movieId: '1',
    theaterId: 't1',
    screenNumber: 1,
    startTime: '16:45',
    endTime: '19:27',
    availableSeats: 45,
    totalSeats: 150,
    price: 16000,
  },
  {
    id: 's4',
    movieId: '1',
    theaterId: 't1',
    screenNumber: 3,
    startTime: '20:00',
    endTime: '22:42',
    availableSeats: 22,
    totalSeats: 150,
    price: 16000,
  },
  {
    id: 's5',
    movieId: '2',
    theaterId: 't2',
    screenNumber: 1,
    startTime: '11:00',
    endTime: '13:36',
    availableSeats: 92,
    totalSeats: 180,
    price: 14000,
  },
  {
    id: 's6',
    movieId: '2',
    theaterId: 't2',
    screenNumber: 1,
    startTime: '14:15',
    endTime: '16:51',
    availableSeats: 156,
    totalSeats: 180,
    price: 14000,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    movieTitle: '라스트 가디언',
    theaterName: '메가박스 강남',
    screenNumber: 1,
    date: '2026-02-15',
    time: '16:45',
    seats: ['G7', 'G8'],
    totalPrice: 32000,
    status: 'confirmed',
    bookingDate: '2026-02-13',
  },
  {
    id: 'b2',
    movieTitle: '스텔라 오디세이',
    theaterName: '롯데시네마 월드타워',
    screenNumber: 3,
    date: '2026-02-20',
    time: '19:30',
    seats: ['F5', 'F6', 'F7'],
    totalPrice: 48000,
    status: 'confirmed',
    bookingDate: '2026-02-14',
  },
  {
    id: 'b3',
    movieTitle: '사랑은 파리에서',
    theaterName: '메가박스 코엑스',
    screenNumber: 2,
    date: '2026-02-10',
    time: '14:00',
    seats: ['E4', 'E5'],
    totalPrice: 28000,
    status: 'cancelled',
    bookingDate: '2026-02-08',
  },
];
