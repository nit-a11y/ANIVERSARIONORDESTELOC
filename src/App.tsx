/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BeachRevealHero } from './components/BeachRevealHero';
import { EventDetails } from './components/EventDetails';
import { RsvpForm } from './components/RsvpForm';
import { MuralBoard } from './components/MuralBoard';
import { DjPlaylist } from './components/DjPlaylist';
import { BeachVibeQuiz } from './components/BeachVibeQuiz';
import { VipBadgeModal } from './components/VipBadgeModal';
import { OrganizerModal } from './components/OrganizerModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { getRsvps, getMuralMessages, getSongs } from './utils/storage';
import { GuestRsvp, MuralMessage, SongTrack } from './types';

export default function App() {
  const [rsvps, setRsvps] = useState<GuestRsvp[]>([]);
  const [muralMessages, setMuralMessages] = useState<MuralMessage[]>([]);
  const [songs, setSongs] = useState<SongTrack[]>([]);
  const [activeGuest, setActiveGuest] = useState<GuestRsvp | null>(null);
  const [showVipModal, setShowVipModal] = useState(false);
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);

  const fireCelebration = () => {
    // Multi-stage confetti celebration cannon
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffcf50', '#f52349', '#38d8ce', '#ffffff', '#ff873d'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3ed5cc', '#ffd166', '#ef476f'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3ed5cc', '#ffd166', '#ef476f'],
      });
    }, 250);
  };

  useEffect(() => {
    // Load local storage initial state
    const loadedRsvps = getRsvps();
    setRsvps(loadedRsvps);
    setMuralMessages(getMuralMessages());
    setSongs(getSongs());

    // Preselect an attendee for quick preview of the badge if desired
    if (loadedRsvps.length > 0) {
      setActiveGuest(loadedRsvps[0]);
    }

    // Como a página agora abre direto na revelação, dispara a festa uma vez
    fireCelebration();
  }, []);

  const handleRsvpSuccess = (saved: GuestRsvp) => {
    setRsvps((prev) => [saved, ...prev.filter((p) => p.id !== saved.id)]);
    setActiveGuest(saved);
    setShowVipModal(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#14050e] text-[#fff2dc] font-sans selection:bg-[#cf4c28] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenRsvp={() => scrollTo('rsvp-section')}
        onOpenOrganizer={() => setShowOrganizerModal(true)}
        onScrollTo={scrollTo}
      />

      <main className="pt-14">
          <div className="animate-fade-in">
            {/* The Big Surprise Beach Hero */}
            <BeachRevealHero
              onOpenRsvp={() => scrollTo('rsvp-section')}
              onOpenBadge={() => {
                if (activeGuest) {
                  setShowVipModal(true);
                } else {
                  scrollTo('rsvp-section');
                }
              }}
              onScrollToDetails={() => scrollTo('event-details')}
              onScrollToMural={() => scrollTo('mural-section')}
              onScrollToPlaylist={() => scrollTo('playlist-section')}
            />

            {/* Event Details: Date, Location, Schedule & Dress Code */}
            <EventDetails />

            {/* RSVP Form Section */}
            <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
              <RsvpForm onSuccess={handleRsvpSuccess} />
            </div>

            {/* Fun Personality Quiz */}
            <BeachVibeQuiz />

            {/* 15 Years Memory & Message Mural */}
            <MuralBoard
              messages={muralMessages}
              onUpdateMessages={(updated) => setMuralMessages(updated)}
            />

            {/* DJ Playlist Voting */}
            <DjPlaylist
              songs={songs}
              onUpdateSongs={(updated) => setSongs(updated)}
            />
          </div>
      </main>

      {/* Footer */}
      <Footer onOpenOrganizer={() => setShowOrganizerModal(true)} />

      {/* VIP Badge / Ticket Modal */}
      {showVipModal && (
        <VipBadgeModal
          guest={activeGuest}
          onClose={() => setShowVipModal(false)}
        />
      )}

      {/* Organizer / HR Management Dashboard Modal */}
      {showOrganizerModal && (
        <OrganizerModal
          rsvps={rsvps}
          onClose={() => setShowOrganizerModal(false)}
        />
      )}
    </div>
  );
}
