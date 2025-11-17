import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  faqOpen: boolean[] = [false, false, false, false, false, false];
  showFloatingBanner: boolean = true;
  isMenuOpen: boolean = false;
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit() {
    const hasSeenBanner = localStorage.getItem('seenFloatingBanner');
    if (hasSeenBanner) {
      this.showFloatingBanner = false;
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openWhatsApp() {
    const message = "Hi! I'm interested in your tech tutoring services. Can you help me with my project?";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/16143306944?text=${encodedMessage}`, '_blank');
  }

  openEmail() {
    const subject = encodeURIComponent("Tech Tutoring Help Request");
    const body = encodeURIComponent("Hi! I'd like to get help with my tech assignment. Here are the details...");
    window.open(`mailto:bytedev32@gmail.com?subject=${subject}&body=${body}`, '_blank');
  }

  openSocial(platform: string) {
    const urls: { [key: string]: string } = {
      tiktok: 'https://tiktok.com/@yourusername',
      instagram: 'https://instagram.com/yourusername'
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  }

  toggleFAQ(index: number) {
    this.faqOpen[index] = !this.faqOpen[index];
  }

  sendMessage() {
    if (this.contactData.name && this.contactData.email && this.contactData.message) {
      const subject = `New message from ${this.contactData.name}`;
      const body = `
Name: ${this.contactData.name}
Email: ${this.contactData.email}
Message: ${this.contactData.message}
      `.trim();
      
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      
      window.open(`mailto:bytedev32@gmail.com?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
      
      this.contactData = { name: '', email: '', message: '' };
      
      alert('Thank you! Your message has been prepared. Please send it from your email client.');
    } else {
      alert('Please fill in all fields before sending.');
    }
  }

  closeFloatingBanner() {
    this.showFloatingBanner = false;
    localStorage.setItem('seenFloatingBanner', 'true');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
  }
}