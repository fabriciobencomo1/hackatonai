# SmartStaff AI

An intelligent team management platform built with Next.js for car dealerships, featuring AI-powered team member matching and profile management.

## 🚀 Features

- **Team Member Profiles**
  - Comprehensive profile creation for different departments
  - Custom biography generation using AI
  - Profile image upload functionality
  - Department-specific information fields

- **Sales Team Management**
  - Detailed salesperson profiles
  - Skills and specialties tracking
  - Languages and certifications management
  - Sales style and motivation tracking

- **AI-Powered Features**
  - Automated biography generation
  - Department-specific profile templates
  - Smart sales team member matching

- **Multi-Department Support**
  - Sales Department
  - Management Team
  - Parts Department

## 🛠 Tech Stack

- **Frontend**
  - Next.js 15.4.3
  - React
  - TypeScript
  - Tailwind CSS
  - React Hook Form
  - React Select

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - OpenAI API

- **Infrastructure**
  - Vercel (deployment)
  - PostgreSQL (database)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- OpenAI API key

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/car-dealership-team.git
   cd car-dealership-team
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

7. **Start production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── prisma/
│   └── schema.prisma      # Database schema
├── public/
│   └── uploads/           # Uploaded images
├── src/
│   ├── app/              # Next.js app router
│   │   ├── actions/      # Server actions
│   │   ├── onboarding/   # Onboarding page
│   │   └── team/         # Team listing page
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
```

## 🔑 Key Features Explained

### Profile Management
- Create and manage team member profiles
- Upload profile pictures
- Generate AI-powered professional biographies
- Track skills, specialties, and certifications

### Department-Specific Features
- **Sales Team**
  - Track languages spoken
  - Record vehicle specialties
  - Monitor sales style and approach
  - Track achievement badges

- **Management Team**
  - Leadership experience tracking
  - Team management metrics
  - Department oversight tools

- **Parts Department**
  - Technical expertise tracking
  - Inventory knowledge
  - Service history

### AI Integration
- Automated biography generation based on profile data
- Department-specific biography templates
- Smart team member matching system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Next.js team for the amazing framework
- All contributors who have helped shape this project
