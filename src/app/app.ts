import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Home } from "./components/home/home";
import { Footer } from './components/footer/footer';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Experience } from './components/experience/experience';
import { Projects } from './components/projects/projects';



@Component({
  selector: 'app-root',
  imports: [ Home, Header, About, Projects, Experience, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
