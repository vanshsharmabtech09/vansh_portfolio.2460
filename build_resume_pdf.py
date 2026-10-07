import os

def create_resume_pdf(output_path):
    # Minimalist yet robust pure python PDF generator
    # Page size: Letter 612 x 792 pt, Margins: 36 pt (0.5 inch)
    
    stream_ops = []
    
    def esc(text):
        return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
    
    # Helper to draw text
    def draw_text(x, y, text, font='F1', size=10, r=0.1, g=0.1, b=0.1):
        stream_ops.append(f"BT /{font} {size} Tf {r:.2f} {g:.2f} {b:.2f} rg {x:.2f} {y:.2f} Td ({esc(text)}) Tj ET")
        
    def draw_line(x1, y1, x2, y2, r=0.2, g=0.4, b=0.7, width=1.0):
        stream_ops.append(f"{r:.2f} {g:.2f} {b:.2f} RG {width:.2f} w {x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    def draw_rect(x, y, w, h, r=0.94, g=0.96, b=0.98):
        stream_ops.append(f"{r:.2f} {g:.2f} {b:.2f} rg {x:.2f} {y:.2f} {w:.2f} {h:.2f} re f")

    # Colors
    # Primary: #0f172a (dark slate)
    # Accent: #0284c7 (tech cyan/blue)
    # Secondary: #475569 (slate grey)
    
    y = 756
    
    # Header
    draw_text(36, y, "VANSH SHARMA", font='F2', size=22, r=0.06, g=0.09, b=0.16)
    y -= 16
    draw_text(36, y, "B.Tech Computer Science & Engineering (Core) | JECRC University, Jaipur", font='F2', size=10, r=0.01, g=0.52, b=0.78)
    y -= 14
    contact_line = "New Delhi / Jaipur, India  |  Email: vanshsharmabtech@gmail.com  |  GitHub: vanshsharmabtech09  |  Portfolio: vansh.dev"
    draw_text(36, y, contact_line, font='F1', size=8.5, r=0.28, g=0.33, b=0.41)
    
    y -= 10
    draw_line(36, y, 576, y, r=0.01, g=0.52, b=0.78, width=1.5)
    y -= 16
    
    # Section Header Helper
    def draw_section_heading(title, curr_y):
        draw_text(36, curr_y, title.upper(), font='F2', size=11, r=0.06, g=0.09, b=0.16)
        draw_line(36, curr_y - 3, 576, curr_y - 3, r=0.82, g=0.85, b=0.89, width=0.75)
        return curr_y - 14

    # 1. EDUCATION
    y = draw_section_heading("Education", y)
    
    # JECRC
    draw_text(36, y, "JECRC University, Jaipur", font='F2', size=10, r=0.06, g=0.09, b=0.16)
    draw_text(485, y, "2026 - 2030 (Expected)", font='F2', size=9, r=0.28, g=0.33, b=0.41)
    y -= 12
    draw_text(36, y, "Bachelor of Technology (B.Tech) - Computer Science & Engineering (Core)", font='F1', size=9, r=0.15, g=0.2, b=0.25)
    y -= 11
    draw_text(36, y, "Relevant Coursework: Programming for Problem Solving (C/C++), Discrete Mathematics, Digital Logic, Web Tech", font='F1', size=8, r=0.4, g=0.45, b=0.5)
    y -= 15
    
    # Class XII
    draw_text(36, y, "Govt. Co-Ed Sr. Sec. School, Dwarka, New Delhi (CBSE)", font='F2', size=9.5, r=0.06, g=0.09, b=0.16)
    draw_text(515, y, "Completed 2024", font='F2', size=9, r=0.28, g=0.33, b=0.41)
    y -= 12
    draw_text(36, y, "Class XII Senior School Certificate Examination - Science Stream (PCM) | Result: 83.4% Distinction", font='F1', size=9, r=0.15, g=0.2, b=0.25)
    y -= 11
    draw_text(36, y, "Highlights: Chemistry 88/100 (A1), Physical Education 90/100 (A2), English 85/100 (B1), Hindi 84/100 (A1), Math 82/100", font='F1', size=8, r=0.4, g=0.45, b=0.5)
    y -= 15

    # Class X
    draw_text(36, y, "Govt. Co-Ed Secondary School, New Delhi (CBSE)", font='F2', size=9.5, r=0.06, g=0.09, b=0.16)
    draw_text(515, y, "Completed 2022", font='F2', size=9, r=0.28, g=0.33, b=0.41)
    y -= 12
    draw_text(36, y, "Class X Secondary School Examination | Result: 78.0% Merit (Social Science: 88, Hindi: 82, Science: 76)", font='F1', size=9, r=0.15, g=0.2, b=0.25)
    y -= 18

    # 2. TECHNICAL SKILLS
    y = draw_section_heading("Technical Skills", y)
    skills = [
        ("Programming Languages", "C (Pointers, Memory, Structs), C++ (OOP, STL Basics), Python (Foundations), JavaScript (ES6+)"),
        ("Web Technologies", "HTML5 Semantic Markup, CSS3, Flexbox, CSS Grid, Responsive Web Design, Canvas 2D"),
        ("Core CS Concepts", "Data Structures & Algorithms Basics, Object-Oriented Programming, Computational Logic"),
        ("Developer Tools", "Git, GitHub Version Control, Visual Studio Code, Windows Terminal, Chrome DevTools")
    ]
    for cat, val in skills:
        draw_text(36, y, f"{cat}:", font='F2', size=8.5, r=0.06, g=0.09, b=0.16)
        draw_text(160, y, val, font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
        y -= 13
    y -= 6

    # 3. PROJECTS
    y = draw_section_heading("Projects", y)
    
    # Project 1
    draw_text(36, y, "Student Record Management System", font='F2', size=9.5, r=0.06, g=0.09, b=0.16)
    draw_text(240, y, "|  C++, File I/O, Data Structures, CLI", font='F1', size=8.5, r=0.01, g=0.52, b=0.78)
    draw_text(505, y, "GitHub Repository", font='F2', size=8.5, r=0.28, g=0.33, b=0.41)
    y -= 11
    draw_text(46, y, "* Engineered a modular CLI database program in C++ with persistent binary file I/O operations.", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
    y -= 10
    draw_text(46, y, "* Implemented records addition, modifications, GPA computations, and linear/binary searching algorithms.", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
    y -= 14

    # Project 2
    draw_text(36, y, "Interactive 3D Cyber Portfolio Engine", font='F2', size=9.5, r=0.06, g=0.09, b=0.16)
    draw_text(245, y, "|  HTML5 Canvas, CSS3, JavaScript ES6+", font='F1', size=8.5, r=0.01, g=0.52, b=0.78)
    draw_text(525, y, "Live Project", font='F2', size=8.5, r=0.28, g=0.33, b=0.41)
    y -= 11
    draw_text(46, y, "* Designed an interactive personal portfolio featuring a 60 FPS real-time 3D perspective canvas horizon.", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
    y -= 10
    draw_text(46, y, "* Incorporated interactive code terminal, particle constellation simulation, and dynamic light/dark theming.", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
    y -= 14

    # Project 3
    draw_text(36, y, "Engineering SGPA & Grade Calculator", font='F2', size=9.5, r=0.06, g=0.09, b=0.16)
    draw_text(245, y, "|  JavaScript, DOM Manipulation, CSS Grid", font='F1', size=8.5, r=0.01, g=0.52, b=0.78)
    draw_text(505, y, "GitHub Repository", font='F2', size=8.5, r=0.28, g=0.33, b=0.41)
    y -= 11
    draw_text(46, y, "* Built a responsive client-side tool allowing university students to compute weighted SGPA across credit courses.", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
    y -= 14

    # Project 4
    draw_text(36, y, "Tactical Logic Quiz & Decision Simulation", font='F2', size=9.5, r=0.06, g=0.09, b=0.16)
    draw_text(245, y, "|  C++, Object-Oriented Design, CLI", font='F1', size=8.5, r=0.01, g=0.52, b=0.78)
    draw_text(505, y, "GitHub Repository", font='F2', size=8.5, r=0.28, g=0.33, b=0.41)
    y -= 11
    draw_text(46, y, "* Programmed an interactive command-line quiz in C++ with OOP classes, conditional routing, and score tracking.", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
    y -= 17

    # 4. CERTIFICATIONS & ACHIEVEMENTS
    y = draw_section_heading("Certifications & Key Achievements", y)
    certs = [
        "Programming for Problem Solving in C - JECRC University, Jaipur (Academic Competency)",
        "CBSE Class XII Senior Secondary Certificate - 83.4% Science PCM High Distinction (Dwarka, New Delhi)",
        "CBSE Class X Secondary School Examination - 78.0% Merit Distinction"
    ]
    for c in certs:
        draw_text(46, y, f"*  {c}", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
        y -= 12
    y -= 6

    # 5. INTERESTS & LEADERSHIP
    y = draw_section_heading("Extracurricular & Strategic Interests", y)
    draw_text(46, y, "*  Cricket: Dedicated outdoor athlete; builds physical endurance, team coordination, and dynamic on-pitch leadership.", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)
    y -= 12
    draw_text(46, y, "*  Competitive Esports (Valorant, Free Fire): Fosters fast situational awareness, tactical comms, and composed decision-making.", font='F1', size=8.5, r=0.2, g=0.25, b=0.3)

    # Assemble PDF Structure
    content_stream = "\n".join(stream_ops).encode('latin-1')
    stream_len = len(content_stream)

    objects = []
    
    # Obj 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # Obj 2: Pages
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # Obj 3: Page
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>")
    # Obj 4: Font Helvetica (Regular)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    # Obj 5: Font Helvetica-Bold
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    # Obj 6: Contents stream
    objects.append(f"<< /Length {stream_len} >>\nstream\n".encode('latin-1') + content_stream + b"\nendstream")

    pdf_bytes = bytearray(b"%PDF-1.4\n")
    xref_offsets = [0]
    
    for i, obj in enumerate(objects, 1):
        xref_offsets.append(len(pdf_bytes))
        pdf_bytes.extend(f"{i} 0 obj\n".encode('latin-1'))
        pdf_bytes.extend(obj)
        pdf_bytes.extend(b"\nendobj\n")

    startxref = len(pdf_bytes)
    pdf_bytes.extend(f"xref\n0 {len(objects) + 1}\n".encode('latin-1'))
    pdf_bytes.extend(b"0000000000 65535 f \n")
    for offset in xref_offsets[1:]:
        pdf_bytes.extend(f"{offset:010d} 00000 n \n".encode('latin-1'))
    
    pdf_bytes.extend(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{startxref}\n%%EOF\n".encode('latin-1'))

    with open(output_path, 'wb') as f:
        f.write(pdf_bytes)
    print(f"Resume generated at {output_path} ({len(pdf_bytes)} bytes)")

if __name__ == '__main__':
    target = os.path.join(os.path.dirname(__file__), 'assets', 'Vansh_Sharma_Resume.pdf')
    create_resume_pdf(target)
